declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}

declare module '*.css'
declare module '*.ts'
declare module 'lodash'
declare module 'mockjs'
declare module '*.svg' {
	const content: string;
	export default content;
}
