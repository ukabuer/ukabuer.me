import { Component, cloneElement, VNode, ComponentChildren } from "preact";

const DOMAttributeNames: Record<string, string> = {
  acceptCharset: "accept-charset",
  className: "class",
  htmlFor: "for",
  httpEquiv: "http-equiv",
};

const browser = typeof window !== "undefined";
let mounted: Component[] = [];

function reducer(components: Component["props"][]): VNode<any>[] {
  const allChildren: ComponentChildren[] = [];
  for (const c of components) {
    if (c.children) {
      if (Array.isArray(c.children)) {
        allChildren.push(...c.children);
      } else {
        allChildren.push(c.children);
      }
    }
  }

  return allChildren
    .reverse()
    .filter(unique())
    .reverse()
    .map((c) => {
      const className =
        (c.props.className ? c.props.className + " " : "") + "preact-head";
      return cloneElement(c, { className });
    });
}

function updateClient(head: VNode<any>[]) {
  const tags: Record<string, VNode<any>[]> = {};
  head.forEach((h) => {
    if (typeof h.type !== "string") return;

    const components = tags[h.type] || [];
    components.push(h);
    tags[h.type] = components;
  });

  if (tags["title"] && tags["title"].length > 0) {
    updateTitle(tags["title"][0]);
  }

  const types = ["meta", "base", "link", "style", "script"];
  types.forEach((type) => {
    updateElements(type, tags[type] || []);
  });
}

function updateElements(type: string, components: any[]) {
  const headEl = document.getElementsByTagName("head")[0];
  const oldTags = Array.prototype.slice.call(
    headEl.querySelectorAll(type + ".preact-head")
  );
  const newTags = components.map(domify).filter((newTag) => {
    for (let i = 0, len = oldTags.length; i < len; i++) {
      const oldTag = oldTags[i];
      if (oldTag.isEqualNode(newTag)) {
        oldTags.splice(i, 1);
        return false;
      }
    }
    return true;
  });

  oldTags.forEach((t) => t.parentNode.removeChild(t));
  newTags.forEach((t) => {
    if (!t) return;
    headEl.appendChild(t);
  });
}

function domify(component: VNode<any>) {
  if (typeof component.type != "string") {
    return;
  }
  const el = document.createElement(component.type);
  const attrs = component.props || {};
  const children = component.props.children;

  for (const p in attrs) {
    if (!Object.prototype.hasOwnProperty.call(attrs, p)) continue;
    if (p === "dangerouslySetInnerHTML") continue;

    const attr = DOMAttributeNames[p] || p.toLowerCase();
    el.setAttribute(attr, attrs[p]);
  }

  if (attrs["dangerouslySetInnerHTML"]) {
    el.innerHTML = attrs["dangerouslySetInnerHTML"].__html || "";
  } else if (children) {
    el.textContent =
      typeof children === "string" ? children : children.join("");
  }

  return el;
}

const METATYPES = ["name", "httpEquiv", "charSet", "itemProp"];

function isVNode(h: ComponentChildren): h is VNode<any> {
  return !Array.isArray(h) && !!Object.getOwnPropertyDescriptor(h, "type");
}

// returns a function for filtering head child elements
// which shouldn't be duplicated, like <title/>.
function unique() {
  const tags: string[] = [];
  const metaTypes: string[] = [];
  const metaCategories: Record<string, string[]> = {};
  return (h: ComponentChildren): h is VNode<any> => {
    if (!isVNode(h)) return false;

    switch (h.type) {
      case "title":
      case "base":
        if (~tags.indexOf(h.type)) return false;
        tags.push(h.type);
        break;
      case "meta":
        for (let i = 0, len = METATYPES.length; i < len; i++) {
          const metatype = METATYPES[i];
          if (!Object.prototype.hasOwnProperty.call(h.props, metatype))
            continue;
          if (metatype === "charSet") {
            if (~metaTypes.indexOf(metatype)) return false;
            metaTypes.push(metatype);
          } else {
            const category = h.props[metatype];
            const categories = metaCategories[metatype] || [];
            if (~categories.indexOf(category)) return false;
            categories.push(category);
            metaCategories[metatype] = categories;
          }
        }
        break;
    }
    return true;
  };
}

function updateTitle(component: VNode<any>) {
  let title;
  if (component) {
    const { children } = component.props;
    title = typeof children === "string" ? children : children.join("");
  } else {
    title = "";
  }
  if (title !== document.title) {
    document.title = title;
  }
}

function update() {
  const state = reducer(mounted.map((mount) => mount.props));
  if (browser) updateClient(state);
}

export default class Head extends Component {
  static rewind() {
    const state = reducer(mounted.map((mount) => mount.props));
    mounted = [];
    return state;
  }

  componentDidUpdate() {
    update();
  }

  componentWillMount() {
    mounted.push(this);
    update();
  }

  componentWillUnmount() {
    const i = mounted.indexOf(this);
    if (i != -1) {
      mounted.splice(i, 1);
    }
    update();
  }

  render() {
    return null;
  }
}
