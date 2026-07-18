import { Card as PRCard, type CardProps as PRCardProps } from 'primereact/card';
import { forwardRef } from 'react';

export interface CardProps extends PRCardProps {}

export const Card = forwardRef<PRCard, CardProps>((props, ref) => {
  return <PRCard ref={ref} {...props} />;
});
Card.displayName = 'Card';


