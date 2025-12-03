import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import LazyImage from "./LazyImage";

const Partners = () => {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const animRef = useRef(null);
  const pausedRef = useRef(false);
  const originalWidthRef = useRef(0);

  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch partners from API
  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/partners");
      const data = await response.json();

      if (data.partners) {
        // Only show active partners with logos
        const activePartners = data.partners.filter(
          (partner) => partner.isActive && partner.logo
        );
        setPartners(activePartners);
      }
    } catch (error) {
      console.error("Error fetching partners:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // compute original width (half of duplicated content)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      // since we duplicate items for seamless scroll, original width is half
      originalWidthRef.current = el.scrollWidth / 2;
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [partners]);

  // continuous auto-scroll from right to left (i.e., increasing scrollLeft)
  useEffect(() => {
    const el = trackRef.current;
    if (!el || partners.length === 0) return;

    let last = performance.now();
    const speed = 40; // pixels per second

    const step = (t) => {
      if (pausedRef.current) {
        last = t;
        animRef.current = requestAnimationFrame(step);
        return;
      }
      const dt = (t - last) / 1000;
      last = t;
      // advance right-to-left visually by increasing scrollLeft
      el.scrollLeft = el.scrollLeft + speed * dt;
      // if we've scrolled past the first set, wrap back
      if (
        originalWidthRef.current > 0 &&
        el.scrollLeft >= originalWidthRef.current
      ) {
        el.scrollLeft = el.scrollLeft - originalWidthRef.current;
      }
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    // pause on hover
    const onEnter = () => (pausedRef.current = true);
    const onLeave = () => (pausedRef.current = false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [partners]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  const backgroundVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Animated Background with Gradient */}
      <motion.div
        className="absolute inset-0 transform -skew-y-6 origin-bottom"
        style={{
          background:
            "linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 50%, #34d399 100%)",
        }}
        variants={backgroundVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-teal-300/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-300/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Heading without underline */}
        <motion.div variants={itemVariants} className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">
            OUR PARTNERS
          </h2>
        </motion.div>

        {/* Description with fade-in */}
        <motion.p
          variants={itemVariants}
          className="text-center text-gray-700 max-w-3xl mx-auto mt-6 mb-12 text-lg leading-relaxed"
        >
          We are immensely grateful for the trust and collaboration of our
          partners. Their contributions not only enhance our programs but also
          inspire us to strive for a brighter and healthier future for all.
        </motion.p>

        {isLoading ? (
          <motion.div variants={itemVariants} className="text-center py-12">
            <div className="text-gray-600">Loading partners...</div>
          </motion.div>
        ) : partners.length === 0 ? (
          <motion.div variants={itemVariants} className="text-center py-12">
            <div className="text-gray-600">No partners to display yet.</div>
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className="relative">
            {/* Partner Logos - smooth continuous scroll */}
            <div
              ref={trackRef}
              className="overflow-x-auto no-scrollbar scroll-smooth py-8"
            >
              <div
                className="flex items-center gap-16 px-6 md:px-10"
                style={{ minWidth: "max-content" }}
              >
                {[...partners, ...partners].map((partner, i) => (
                  <motion.div
                    key={`${partner._id}-${i}`}
                    className="shrink-0 flex items-center justify-center group"
                    style={{ minWidth: 180 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LazyImage
                      src={partner.logo}
                      alt={partner.name}
                      title={partner.name}
                      className="max-h-20 md:max-h-24 object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Partners;
