"use client";

import {
  useState,
  useRef,
  cloneElement,
  isValidElement,
  type ReactElement,
  type Ref,
} from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  arrow,
  FloatingArrow,
} from "@floating-ui/react";

interface TooltipProps {
  children: React.ReactNode;
  content: string | React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  arrow?: boolean;
  className?: string;
  disabled?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = "top",
  arrow: showArrow = true,
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: position,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(6),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      showArrow && arrow({ element: arrowRef }),
    ].filter(Boolean),
  });

  const hover = useHover(context, {
    delay: { open: 500, close: 0 },
    restMs: 40,
    enabled: !disabled,
  });

  const dismiss = useDismiss(context, {
    referencePress: true,
    ancestorScroll: true,
  });

  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss,
    role,
  ]);

  const trigger = isValidElement(children)
    ? cloneElement(
        children as ReactElement<{
          onClick?: (e: React.MouseEvent) => void;
          ref?: Ref<HTMLElement>;
        }>,
        {
          ...getReferenceProps({
            onClick: (e: React.MouseEvent) => {
              const childrenProps = (
                children as ReactElement<{
                  onClick?: (e: React.MouseEvent) => void;
                }>
              ).props;
              if (childrenProps.onClick) {
                childrenProps.onClick(e);
              }
              if (isOpen) {
                setIsOpen(false);
              }
            },
          }),
          ref: (node: HTMLElement | null) => {
            refs.setReference(node);
            const originalRef = (
              children as ReactElement<{ ref?: Ref<HTMLElement> }>
            ).props.ref;
            if (typeof originalRef === "function") {
              originalRef(node);
            } else if (
              originalRef &&
              typeof originalRef === "object" &&
              originalRef !== null
            ) {
              originalRef.current = node;
            }
          },
        },
      )
    : children;

  return (
    <>
      {trigger}
      <FloatingPortal>
        {isOpen && content && (
          <div
            className={`z-9999 px-3 py-1.5 sm:text-2xs text-3xs text-white bg-stone-700 rounded-md shadow-lg whitespace-nowrap pointer-events-none ${className}`}
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {content}
            {showArrow && (
              <FloatingArrow
                ref={arrowRef}
                context={context}
                className="fill-stone-700"
              />
            )}
          </div>
        )}
      </FloatingPortal>
    </>
  );
};
