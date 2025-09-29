import React from 'react';
import './Card.css';

const Card = ({
  children,
  className = '',
  hover = true,
  padding = 'md',
  shadow = 'sm',
  ...props
}) => {
  const cardClasses = [
    'card',
    `card-padding-${padding}`,
    `card-shadow-${shadow}`,
    hover && 'card-hover',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`card-header ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`card-content ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`card-footer ${className}`} {...props}>
    {children}
  </div>
);

const CardImage = ({ src, alt, className = '', ...props }) => (
  <div className={`card-image ${className}`} {...props}>
    <img src={src} alt={alt} />
  </div>
);

export { Card, CardHeader, CardContent, CardFooter, CardImage };
export default Card;