"use client";

import { useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import { useIsV0 } from "@/lib/context";
import Link from "next/link";
import { socialLinks } from "@/lib/constants";

const DURATION = 0.3;
const DELAY = DURATION;
const EASE_OUT = "easeOut";
const EASE_OUT_OPACITY = [0.25, 0.46, 0.45, 0.94] as const;
const SPRING = {
  type: "spring" as const,
  stiffness: 60,
  damping: 10,
  mass: 0.8,
};

export const Newsletter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [accountX, setAccountX] = useState("");
  const [likeRepostCmt, setLikeRepostCmt] = useState("");
  const [solWallet, setSolWallet] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const isInitialRender = useRef(true);

  useEffect(() => {
    return () => {
      isInitialRender.current = false;
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex overflow-hidden relative flex-col gap-4 justify-center items-center pt-10 w-full h-full short:lg:pt-10 pb-footer-safe-area 2xl:pt-footer-safe-area px-sides short:lg:gap-4 lg:gap-8">
      <motion.div
        layout="position"
        transition={{ duration: DURATION, ease: EASE_OUT }}
      >
        <h1 className="font-serif text-5xl italic short:lg:text-8xl sm:text-8xl lg:text-9xl text-foreground">
          Synecdoche®
        </h1>
      </motion.div>

      <div className="flex flex-col items-center min-h-0 shrink">
        <AnimatePresenceGuard>
          {/* newsletter signup removed */}

          <motion.div
            layout="position"
            transition={SPRING}
            key="button"
            className={isOpen ? "my-6" : "mt-6"}
          >
            <Button
              className={cn("relative px-8")}
              onClick={() => setIsOpen(!isOpen)}
              shine={!isOpen}
            >
              <motion.span
                animate={{ x: isOpen ? -16 : 0 }}
                transition={{ duration: DURATION, ease: EASE_OUT }}
                className="inline-block"
              >
                Airdrop
              </motion.span>

              {isOpen && (
                <motion.div
                  className={cn(
                    buttonVariants({ variant: "iconButton", size: "icon" }),
                    "absolute -top-px -right-px aspect-square"
                  )}
                  initial={{ opacity: 0, scale: 0.8, rotate: -40 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    duration: DURATION,
                    ease: EASE_OUT,
                    delay: DELAY,
                  }}
                >
                  <Cross1Icon className="size-5 text-primary-foreground" />
                </motion.div>
              )}
            </Button>
          </motion.div>

          {isOpen && (
            <motion.div
              key="airdrop-form"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: DELAY,
                    duration: DURATION,
                    ease: EASE_OUT,
                  },
                },
                hidden: {
                  opacity: 0,
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT },
                },
                exit: {
                  opacity: 0,
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT_OPACITY },
                },
              }}
              className="relative flex min-h-0 flex-shrink text-sm md:text-base flex-col gap-8 backdrop-blur-xl text-balance border-2 border-border/50 bg-primary/20 w-full max-w-xl md:w-[45vw] text-foreground rounded-3xl ring-1 ring-offset-primary/10 ring-border/10 ring-offset-2 shadow-button p-8"
            >
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!accountX.trim() || !likeRepostCmt.trim() || !solWallet.trim()) {
                    setStatus({ type: "error", message: "Please fill in all fields before submitting." });
                    return;
                  }
                  setStatus({ type: "success", message: "Submitted successfully. Thank you!" });
                }}
              >
                <label className="text-left font-medium text-base">
                  Follow{" "}
                  <Link
                    href={socialLinks.x}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4 hover:opacity-90"
                  >
                    Synecdoche
                  </Link>
                  <Input
                    className="mt-2 text-base py-3 px-4 h-auto"
                    placeholder="Enter Account X"
                    autoComplete="off"
                    value={accountX}
                    onChange={(e) => setAccountX(e.target.value)}
                  />
                </label>
                <label className="text-left font-medium text-base">
                  Like & Repost & CMT
                  <Input
                    className="mt-2 text-base py-3 px-4 h-auto"
                    placeholder="Enter Like/Repost/CMT"
                    autoComplete="off"
                    value={likeRepostCmt}
                    onChange={(e) => setLikeRepostCmt(e.target.value)}
                  />
                </label>
                <label className="text-left font-medium text-base">
                  SOL Wallet
                  <Input
                    className="mt-2 text-base py-3 px-4 h-auto"
                    placeholder="Enter SOL wallet"
                    autoComplete="off"
                    value={solWallet}
                    onChange={(e) => setSolWallet(e.target.value)}
                  />
                </label>
                {status && (
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm font-medium text-left",
                      status.type === "success"
                        ? "bg-emerald-500/20 text-emerald-100 border border-emerald-300/40"
                        : "bg-amber-500/20 text-amber-100 border border-amber-300/40"
                    )}
                  >
                    {status.message}
                  </div>
                )}
                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                    Close
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresenceGuard>
      </div>
    </div>
  );
};

const AnimatePresenceGuard = ({ children }: { children: React.ReactNode }) => {
  const isV0 = useIsV0();

  return isV0 ? <>{children}</> : <AnimatePresence mode="popLayout" propagate>{children}</AnimatePresence>;
};
