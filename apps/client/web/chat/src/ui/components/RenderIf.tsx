interface RenderIfProps {
  children: JSX.Element
  condition: boolean
  fallback?: JSX.Element
}
export const RenderIf = ({ children, condition, fallback }: RenderIfProps) => {
  const Default = fallback || null
  return condition === true ? children : Default
}