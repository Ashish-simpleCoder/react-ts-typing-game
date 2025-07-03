import type { ComponentPropsWithRef, ElementType } from 'react'
import type { DistributiveOmit, OmitChildrenFromVoid } from './box'
import { cn } from '../../lib/cn'

function Container<As extends ElementType>(
   props: DistributiveOmit<OmitChildrenFromVoid<As>, keyof object> & { As: As },
): JSX.Element
function Container(props: ComponentPropsWithRef<'div'>): JSX.Element
function Container({ As: Component = 'div', ...props }) {
   const { className, ...rest } = props

   return (
      <>
         <Component
            // @ts-expect-error <className can not be types safely>
            className={cn('max-w-[1600px] px-6 py-3', className)}
            {...rest}
         />
      </>
   )
}
export default Container
