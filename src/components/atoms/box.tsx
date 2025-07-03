import type { ComponentPropsWithRef, ElementType } from 'react'

function Box<As extends ElementType>(
   props: DistributiveOmit<OmitChildrenFromVoid<As>, keyof object> & { As: As },
): JSX.Element
function Box(props: ComponentPropsWithRef<'div'>): JSX.Element
function Box({ As: Component = 'div', ...props }) {
   const { className, ...rest } = props

   return (
      <>
         <Component
            // @ts-expect-error <className can not be types safely>
            className={className}
            {...rest}
         />
      </>
   )
}
export default Box

// types

export type VoidElement =
   | 'area'
   | 'base'
   | 'br'
   | 'col'
   | 'hr'
   | 'img'
   | 'input'
   | 'link'
   | 'meta'
   | 'param'
   | 'command'
   | 'keygen'
   | 'source'

export type OmitChildrenFromVoid<C extends React.ElementType> = C extends VoidElement
   ? Omit<React.ComponentPropsWithRef<C>, 'children'>
   : React.ComponentPropsWithRef<C>

export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never
