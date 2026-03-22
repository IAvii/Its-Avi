"use client";
/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { useRef, useState } from "react";

function smoothScrollToHash(href: string): boolean {
  if (!href.startsWith("#")) return false;

  const targetId = href.slice(1);
  if (!targetId) return false;

  const target = document.getElementById(targetId);
  if (!target) return false;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  const onMobileItemClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (smoothScrollToHash(href)) {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div className={cn("relative hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <a
                  href={item.href}
                  key={item.title}
                  onClick={(event) => onMobileItemClick(event, item.href)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background/90 text-muted-foreground backdrop-blur-sm transition-colors duration-300 hover:border-muted-foreground/50 hover:text-foreground"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background/90 text-muted-foreground backdrop-blur-sm transition-colors duration-300 hover:border-muted-foreground/50 hover:text-foreground"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        // "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-gray-50 px-4 pb-3 md:flex dark:bg-neutral-900",
        "mx-auto hidden h-16 items-center gap-3 rounded-lg border border-border bg-background/80 px-3 py-2 backdrop-blur-sm transition-colors duration-300 hover:border-muted-foreground/40 lg:flex",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [38, 62, 38]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [38, 62, 38]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [18, 26, 18]);
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [18, 26, 18],
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 130,
    damping: 16,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 130,
    damping: 16,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 130,
    damping: 16,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 130,
    damping: 16,
  });

  const [hovered, setHovered] = useState(false);

  const onDesktopItemClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (smoothScrollToHash(href)) {
      event.preventDefault();
    }
  };

  return (
    <a href={href} onClick={onDesktopItemClick} className="group">
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-lg border border-border/70 bg-background/70 text-dock-icon transition-colors duration-200 group-hover:border-muted-foreground/50 group-hover:text-foreground"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit whitespace-pre rounded-md border border-border bg-card px-2 py-0.5 text-xs text-card-foreground"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
