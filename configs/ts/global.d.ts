interface IClassNames {
  [className: string]: string;
}

declare module '*.html' {
  const content: string;
  export default content;
}

declare module '*.module.sass' {
  const classNames: IClassNames;
  export default classNames;
}

declare module '*.module.scss' {
  const classNames: IClassNames;
  export default classNames;
}

declare module '*.module.css' {
  const classNames: IClassNames;
  export default classNames;
}

declare module '*.scss' {
  const content: string;
  export default content;
}

declare module '*.sass' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.jpeg';
declare module '*.jpg';
declare module '*.png';
declare module '*.svg';

declare module '*.txt' {
  const content: string;
  export default content;
}

declare module '*.md' {
  const content: string;
  export default content;
}
