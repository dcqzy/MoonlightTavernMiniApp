import navBar from './components/nav-bar/navBar.vue';
import tools from './components/tools-component/toolsComponent.vue';
import swiperImage from './components/swiper-component/swiperComponent.vue';

export default (() => {
const __VLS_setup = async () => {
const __VLS_publicComponent = (await import('vue')).defineComponent({
setup() {
return {};
},
});

const __VLS_componentsOption = {};

let __VLS_name!: 'index';
function __VLS_template() {
let __VLS_ctx!: InstanceType<import('./__VLS_types.js').PickNotAny<typeof __VLS_publicComponent, new () => {}>> & InstanceType<import('./__VLS_types.js').PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_localComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption & typeof __VLS_ctx;
let __VLS_otherComponents!: typeof __VLS_localComponents & import('./__VLS_types.js').GlobalComponents;
let __VLS_own!: import('./__VLS_types.js').SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & typeof __VLS_publicComponent & (new () => { $slots: typeof __VLS_slots; }) >;
let __VLS_components!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
/* Style Scoped */
type __VLS_StyleScopedClasses = {};
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_templateComponents!: {} &
import('./__VLS_types.js').WithComponent<'navBar', typeof __VLS_components, 'NavBar', 'navBar'> &
import('./__VLS_types.js').WithComponent<'ScrollView', typeof __VLS_components, 'ScrollView', 'scrollView', 'scroll-view'> &
import('./__VLS_types.js').WithComponent<'swiperImage', typeof __VLS_components, 'SwiperImage', 'swiperImage'> &
import('./__VLS_types.js').WithComponent<'tools', typeof __VLS_components, 'Tools', 'tools'>;
__VLS_components.NavBar; __VLS_components.navBar;
// @ts-ignore
[navBar,];
__VLS_components.ScrollView; __VLS_components.ScrollView; __VLS_components.scrollView; __VLS_components.scrollView; __VLS_components['scroll-view']; __VLS_components['scroll-view'];
// @ts-ignore
[ScrollView, ScrollView,];
__VLS_components.SwiperImage; __VLS_components.swiperImage;
// @ts-ignore
[swiperImage,];
__VLS_components.Tools; __VLS_components.tools;
// @ts-ignore
[tools,];
{
(__VLS_x as import('./__VLS_types.js').ComponentProps<typeof __VLS_templateComponents.navBar>) = {};
}
{
__VLS_templateComponents.ScrollView;
(__VLS_x as import('./__VLS_types.js').ComponentProps<typeof __VLS_templateComponents.ScrollView>) = { scrollY: (true), 'scroll-y': (true), enableFlex: (true), 'enable-flex': (true), enableBackToTop: (true), 'enable-back-to-top': (true), };
{
({} as JSX.IntrinsicElements).view;
({} as JSX.IntrinsicElements).view;
(__VLS_x as JSX.IntrinsicElements)['view'] = { class: ("swiperImage item"), };
{
(__VLS_x as import('./__VLS_types.js').ComponentProps<typeof __VLS_templateComponents.swiperImage>) = {};
}
}
{
({} as JSX.IntrinsicElements).view;
({} as JSX.IntrinsicElements).view;
(__VLS_x as JSX.IntrinsicElements)['view'] = { style: ({}), };
}
{
({} as JSX.IntrinsicElements).view;
({} as JSX.IntrinsicElements).view;
(__VLS_x as JSX.IntrinsicElements)['view'] = { style: ({}), };
}
{
({} as JSX.IntrinsicElements).view;
({} as JSX.IntrinsicElements).view;
(__VLS_x as JSX.IntrinsicElements)['view'] = { style: ({}), };
}
{
({} as JSX.IntrinsicElements).view;
({} as JSX.IntrinsicElements).view;
(__VLS_x as JSX.IntrinsicElements)['view'] = { style: ({}), };
}
{
({} as JSX.IntrinsicElements).view;
({} as JSX.IntrinsicElements).view;
(__VLS_x as JSX.IntrinsicElements)['view'] = { style: ({}), };
}
{
(__VLS_x as import('./__VLS_types.js').ComponentProps<typeof __VLS_templateComponents.tools>) = {};
}
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
}
declare var __VLS_slots: {};
return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
setup() {
return {
navBar: navBar,
tools: tools,
swiperImage: swiperImage,
};
},
});
return {} as typeof __VLS_publicComponent;
};
return {} as typeof __VLS_setup extends () => Promise<infer T> ? T : never;
})({} as any);
