const CTAButton = ({
  children,
  isFixed = false,
  variant = "green",
  onClick,
  href,
  target = "_blank",
  rel = "noopener noreferrer",
  className = "",
  icon,
  showIcon = true,
  ...props
}) => {
  const baseClasses = "min-h-11 min-w-0 inline-flex items-center justify-center gap-2 text-center font-semibold leading-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const variants = {
    grey: "bg-gray-600 hover:bg-gray-700 text-white focus-visible:ring-gray-500",
    green: "bg-green-600 hover:bg-green-700 text-white focus-visible:ring-green-500",
  };
  const sizeClasses = isFixed
    ? "px-3 py-3 sm:px-6 rounded-full shadow-lg text-sm sm:text-base"
    : "px-4 py-3 sm:px-8 rounded-lg shadow-lg text-sm sm:text-base";
  const classes = `${baseClasses} ${variants[variant] || variants.green} ${sizeClasses} ${className}`;
  const content = <>
    {showIcon && icon && <span aria-hidden="true" className="shrink-0">{icon}</span>}
    <span className="min-w-0">{children}</span>
  </>;

  if (href) {
    return <a href={href} target={target} rel={rel} onClick={onClick} className={classes} {...props}>{content}</a>;
  }

  return <button type="button" onClick={onClick} className={classes} {...props}>{content}</button>;
};

export default CTAButton;
