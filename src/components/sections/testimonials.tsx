"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Grid, X } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  avatarColor: string;
}

const ITEMS: Testimonial[] = [
  {
    id: "fan-1",
    name: "Swastik Verma",
    location: "Roommate / Listener",
    quote: "He is someone who is truly committed to what he loves. Being his roommate, I saw him grow from making videos using a mobile in 2 degrees weather at night and recording songs inside his room covering his bed to remove noise to singing in proper studios and having a team to make videos. He truly loves his music and will go to any lengths to make it work.",
    avatarColor: "from-purple-500 to-indigo-600",
  },
  {
    id: "fan-2",
    name: "Rakoon Singh",
    location: "Florida, USA",
    quote: "Watching your journey has been truly inspiring—your consistency and passion for music really stand out. It's amazing to see how you're building your own identity as an independent artist. Every milestone you share reflects the hard work and dedication you've put in over the years. Wishing you many more listeners, bigger stages, and well-deserved success ahead!",
    avatarColor: "from-amber-400 to-orange-500",
  },
  {
    id: "fan-3",
    name: "Kashish",
    location: "Jalandhar, India",
    quote: "Your songs have a soothing and calming vibe that creates a peaceful listening experience. The melodies are beautiful, the emotions feel genuine, and every track leaves a lasting impression.",
    avatarColor: "from-emerald-500 to-teal-500",
  },
  {
    id: "fan-4",
    name: "Shivam",
    location: "Bareilly, India",
    quote: "I've been following your music for quite some time, and it's been inspiring to see your growth as an artist. Your songs have a unique emotional depth, and your performances always feel genuine and engaging. You bring passion and authenticity to everything you create, making your music memorable and relatable.",
    avatarColor: "from-blue-500 to-indigo-600",
  },
  {
    id: "fan-5",
    name: "Aman Gupta",
    location: "Gopalganj, Bihar",
    quote: "His songs are really nice. And on top of that he is a very nice guy... I will be waiting for your new songs!",
    avatarColor: "from-rose-500 to-red-500",
  },
  {
    id: "fan-6",
    name: "Aryan Raj",
    location: "Kanpur, India",
    quote: "Really good music! I love your songs and your performance at freshers intro and on other events too.",
    avatarColor: "from-yellow-400 to-amber-600",
  },
  {
    id: "fan-7",
    name: "Rajneesh Kumar Gupta",
    location: "Kanpur, India",
    quote: "Prathamesh is an incredible singer! I’ve been a huge fan ever since his first song, Tera Asar. My family loves his music too, especially Maa Forever, which is one of my absolute favorites. Please make more songs!",
    avatarColor: "from-cyan-500 to-blue-600",
  },
  {
    id: "fan-8",
    name: "Mohd Saqib",
    location: "Delhi, India",
    quote: "Prathmesh's songs are calming and thoughtful. It's a delight to listen to them especially if there's rain sounds in the background.",
    avatarColor: "from-purple-500 to-pink-500",
  },
  {
    id: "fan-9",
    name: "Ankita Chaudhary",
    location: "Jaipur, India",
    quote: "Prathmesh bhaiya is one of the most talented singers on our campus. As a student from the IMBA program and a Spotify-verified artist, he has already achieved something that many aspiring musicians dream of. His voice, stage presence, and dedication to music make every performance memorable.",
    avatarColor: "from-violet-600 to-fuchsia-600",
  },
  {
    id: "fan-10",
    name: "Palvika Sharma",
    location: "Lucknow, India",
    quote: "I always thought that listening to singers live won't be as comparable to their songs on record, but I am glad that Prathamesh Singh changed this perspective of mine. Listening to him as a live audience is as magical as his Spotify. I am glad that he chose his passion and is working towards it!",
    avatarColor: "from-sky-400 to-blue-500",
  },
  {
    id: "fan-11",
    name: "Tanishq Srivastava",
    location: "Gurgaon, India",
    quote: "Depth and dedication is visible in Prathamesh's voice, especially in his originals. 'Maa Forever' was a masterpiece song which I could resonate with and keep repeating it in my mind! Thanks Prathamesh, keep composing such wonders.",
    avatarColor: "from-lime-500 to-emerald-600",
  },
  {
    id: "fan-12",
    name: "Krish Kumar",
    location: "Patna, India",
    quote: "I have a great experience with Prathmesh's songs.",
    avatarColor: "from-amber-400 to-orange-500",
  },
  {
    id: "fan-13",
    name: "Ansh Sachdev",
    location: "Noida, India",
    quote: "The songs are really amazing. My personal favourite is Ramz. I relate to it so much. I have myself starred in one of his MVs and it was such an amazing and fun experience. I wish him the absolute best for his career ahead!",
    avatarColor: "from-rose-500 to-pink-600",
  },
  {
    id: "fan-14",
    name: "Aryan Gupta",
    location: "Meerut, India",
    quote: "When I first heard Prathmesh Singh, I expected typical college hype. Then I saw him produce raw tracks from scratch, right on campus. First, his voice hooked me, now his character inspires me. It's rare to see such a rock-hard, relentless artist. He builds his own path. Proud to have a senior like you.",
    avatarColor: "from-teal-400 to-emerald-600",
  },
  {
    id: "fan-15",
    name: "Pratyush",
    location: "Saharanpur, India",
    quote: "From Tera Asar to Bas Kar Yeh Teri Baatein all songs hit different. Grateful to experience live show!",
    avatarColor: "from-purple-600 to-indigo-600",
  },
  {
    id: "fan-16",
    name: "Aditya Upadhyay",
    location: "Arrah, Bihar",
    quote: "Brother, you are a very fantastic artist. Love your music. Your lines are too good man. Keep it up.",
    avatarColor: "from-yellow-400 to-orange-500",
  },
  {
    id: "fan-17",
    name: "Parth Pandey",
    location: "Gurugram, India",
    quote: "Love your voice, original songs, and live performances!! Aap college fests ki jaan ho.. Keep bringing more songs!",
    avatarColor: "from-blue-400 to-indigo-500",
  },
  {
    id: "fan-18",
    name: "Anish Singh",
    location: "Kullu, Himachal Pradesh",
    quote: "I’ve been a batchmate of Prathamesh and his works are absolutely phenomenal. He has been a terrific influence here at IIT Mandi, both as a student and as a performer and I hope he’ll be an inspiration to those around the country who want to make it big. I wish the best for you bhai !!! Godspeed !!!!",
    avatarColor: "from-fuchsia-500 to-pink-500",
  },
  {
    id: "fan-19",
    name: "Kaustubh",
    location: "Bengaluru, India",
    quote: "Prathamesh’s efforts at making it big in music inspires me to dream big too.",
    avatarColor: "from-emerald-400 to-cyan-500",
  },
  {
    id: "fan-20",
    name: "Ashu",
    location: "Mandi, Himachal Pradesh",
    quote: "A cutu making girls know through his songs that there is always someone special for them who loves them a lot and makes them feel special. A Half Crack fan of yours. #YehTeraHeAsarHai",
    avatarColor: "from-rose-400 to-red-500",
  },
  {
    id: "fan-21",
    name: "Mahi Sahai",
    location: "Lucknow, India",
    quote: "You are a great musician! Recently heard your songs.. also we are connected on Instagram.. and your work is truly one of a kind!",
    avatarColor: "from-amber-400 to-yellow-500",
  },
  {
    id: "fan-22",
    name: "Isha",
    location: "Punjab, India",
    quote: "Incredible vocal control and a tone so soulful, it stays with you long after the song ends.",
    avatarColor: "from-indigo-500 to-purple-600",
  },
  {
    id: "fan-23",
    name: "Ayush Bhardwaj",
    location: "Patiala, Punjab",
    quote: "Really good artist with really meaningful songs. Listened to his songs Tera Asar and Maa Forever on repeat when they released. Overall a very talented individual.",
    avatarColor: "from-cyan-400 to-blue-600",
  },
  {
    id: "fan-24",
    name: "Kartik Agarwal",
    location: "Bulandshahr, India",
    quote: "Pratmesh bhai’s voice is so melodious that my playlist gets jealous every time he uploads a new song. Pure vibes, pure talent, and always a treat to listen to. Keep rocking, bhai!",
    avatarColor: "from-red-500 to-orange-500",
  },
  {
    id: "fan-25",
    name: "Soham",
    location: "Mumbai, India",
    quote: "Just pure and rawness, still remember the day when he sang for me when I called him up and the kind of show took off it’s standard and it was the best way ever I ended my show. One of the greatest and down to earth person I ever met.",
    avatarColor: "from-purple-500 to-indigo-500",
  },
  {
    id: "fan-26",
    name: "Ankush Kumar",
    location: "Ara, Bihar",
    quote: "Very nice and I also listen to your songs and that is amazing. I am Ankush from DAV Dhanupara.",
    avatarColor: "from-emerald-500 to-teal-600",
  },
  {
    id: "fan-27",
    name: "Utkarsh Anand",
    location: "Vaishali, Bihar",
    quote: "Your music has a beautiful way of connecting with people and creating lasting memories. Every performance reflects your passion, creativity, and dedication. Beyond being an amazing musician, your humble and supportive nature makes everyone admire you. Keep creating melodies that inspire hearts - wishing you endless success!",
    avatarColor: "from-blue-600 to-violet-600",
  },
  {
    id: "fan-28",
    name: "Shresth Jha",
    location: "New Delhi, India",
    quote: "He takes joy in singing and that reflects in his voice. A person always ready to perform and always outstanding.",
    avatarColor: "from-pink-500 to-rose-600",
  },
  {
    id: "fan-29",
    name: "Ria Sharma",
    location: "Noida, India",
    quote: "I have listened to Prathmesh’s song and lives. I can definitely say his voice carries both strength and softness. He sings with a natural tone, and his tone feels both expressive and peaceful. And I would absolutely like to see him doing concerts in future.",
    avatarColor: "from-amber-500 to-yellow-600",
  },
  {
    id: "fan-30",
    name: "Hardik",
    location: "Delhi, India",
    quote: "Prathmesh is a wonderful singer. The way his audience connects to his music and melodies is unmatched. I have listened to him several times and I must say each time I was so impressed! Truly an upcoming sensation! Do listen to all his originals!!",
    avatarColor: "from-teal-500 to-cyan-600",
  },
  {
    id: "fan-31",
    name: "Hardik Agarwal",
    location: "Gwalior, India",
    quote: "From first time hearing Tera Asar to recent Ramz, the diverse music taste and new melodies I heard are so unreal. I am fond of your music live, the vibe and energy feels so attachable that sometimes I stream it more than 10 times on loop. I also get the opportunity to perform with you which is also an achievement. Lots of love from your junior to bade log!",
    avatarColor: "from-violet-500 to-purple-600",
  },
  {
    id: "fan-32",
    name: "Miraya",
    location: "Jaipur, India",
    quote: "The way Prathmesh is always so excited for every original he launches and how he puts his heart and soul into his work is truly inspiring and commendable! Always a pleasure to see him performing live :)",
    avatarColor: "from-rose-500 to-pink-500",
  },
  {
    id: "fan-33",
    name: "Raunak Malhotra",
    location: "Agra, India",
    quote: "Prathamesh has been phenomenal. His passion for music shows up with each strum of his guitar, and with each line of the songs he sings. And not to forget the themes of the music he produces: soft, and something which gives peace to someone who listens. Thank you Prathmesh, you're a gem to the music world!",
    avatarColor: "from-amber-400 to-orange-600",
  },
  {
    id: "fan-34",
    name: "Aman Nafees",
    location: "Unnao, India",
    quote: "Your songs will always be in my heart and in my playlists, dude. Let us do the next song better than the previous one.",
    avatarColor: "from-indigo-600 to-blue-600",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAllModal, setShowAllModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (showAllModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showAllModal]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % ITEMS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + ITEMS.length) % ITEMS.length);
  };

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -300) {
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 300) {
      handlePrev();
    }
  };

  return (
    <section 
      id="testimonials" 
      className="relative min-h-screen py-16 md:py-24 bg-background overflow-hidden px-3 sm:px-6 md:px-16 border-t border-white/5"
    >
      <div className="w-full max-w-5xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col mb-10 md:mb-16 text-center px-2">
          <span className="text-[10px] tracking-[0.35em] font-bold text-gold uppercase mb-2">FAN TESTIMONIALS</span>
          <h3 className="text-3xl md:text-5xl font-light font-serif-lux text-foreground italic">
            Voices of the Community
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-white/40 font-light max-w-xl">
            Real stories, feelings, and messages from listeners across the country.
          </p>
        </div>

        {/* 3D Stacked Cards Carousel Container */}
        <div className="relative w-full h-[360px] md:h-[360px] flex items-center justify-center">
          {ITEMS.map((item, idx) => {
            // Calculate 3D offset placement relative to active index
            let offset = idx - activeIndex;
            if (offset < -Math.floor(ITEMS.length / 2)) offset += ITEMS.length;
            if (offset > Math.floor(ITEMS.length / 2)) offset -= ITEMS.length;

            const isActive = offset === 0;
            const isPrev = offset === -1;
            const isNext = offset === 1;

            const xOffset = isMobile ? 35 : 240;
            const prevRotate = isMobile ? -3 : -6;
            const nextRotate = isMobile ? 3 : 6;
            const stackScale = isMobile ? 0.92 : 0.85;
            const stackOpacity = isMobile ? 0.3 : 0.5;

            let x = 0;
            let scale = 1;
            let rotate = 0;
            let zIndex = 10;
            let opacity = 1;

            if (isActive) {
              x = 0;
              scale = 1.0;
              rotate = 0;
              zIndex = 30;
            } else if (isPrev) {
              x = -xOffset;
              scale = stackScale;
              rotate = prevRotate;
              zIndex = 20;
              opacity = stackOpacity;
            } else if (isNext) {
              x = xOffset;
              scale = stackScale;
              rotate = nextRotate;
              zIndex = 20;
              opacity = stackOpacity;
            } else {
              opacity = 0;
              zIndex = 0;
            }

            return (
              <motion.div
                key={item.id}
                animate={{
                  x,
                  scale,
                  rotate,
                  zIndex,
                  opacity
                }}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 20
                }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={isActive ? handleDragEnd : undefined}
                onClick={() => {
                  if (!isActive) setActiveIndex(idx);
                }}
                className={`absolute w-full max-w-[90vw] sm:max-w-[420px] rounded-3xl glass p-5 md:p-8 border border-white/10 shadow-2xl flex flex-col justify-between ${
                  isActive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer pointer-events-auto"
                }`}
                style={{ originY: 0.5 }}
              >
                {/* Quotation Icon */}
                <div className="flex justify-between items-start mb-3">
                  <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-gold/40" />
                  <span className="text-[9px] font-mono text-gold/70 tracking-widest uppercase">
                    COMMUNITY MESSAGE #{idx + 1}
                  </span>
                </div>

                {/* Review Text with native Lenis scroll prevention */}
                <p 
                  data-lenis-prevent
                  data-lenis-prevent-touch
                  className="text-xs sm:text-sm md:text-base text-white/90 font-serif-lux italic leading-relaxed text-left mb-6 max-h-[170px] overflow-y-auto custom-scrollbar touch-auto overscroll-contain pr-2 select-text"
                >
                  “{item.quote}”
                </p>

                {/* Profile Info */}
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  {/* Avatar Circle */}
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr ${item.avatarColor} shrink-0 shadow-lg`} />
                  
                  <div className="flex flex-col text-left">
                    <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider truncate max-w-[200px]">
                      {item.name}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-gold/80 font-mono tracking-widest uppercase truncate max-w-[200px]">
                      {item.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Controls & Modal Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-10">
          <div className="flex items-center gap-5">
            <button 
              type="button"
              onClick={handlePrev}
              className="p-3.5 rounded-full glass border border-white/10 hover:border-gold text-foreground hover:text-gold transition-all duration-300 cursor-pointer shadow-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <span className="text-xs font-mono text-white/60 tracking-widest">
              {String(activeIndex + 1).padStart(2, "0")} / {String(ITEMS.length).padStart(2, "0")}
            </span>

            <button 
              type="button"
              onClick={handleNext}
              className="p-3.5 rounded-full glass border border-white/10 hover:border-gold text-foreground hover:text-gold transition-all duration-300 cursor-pointer shadow-lg"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowAllModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-white/10 hover:border-gold/50 text-xs font-mono text-gold uppercase tracking-wider transition-all hover:scale-105 cursor-pointer shadow-lg"
          >
            <Grid className="w-3.5 h-3.5" />
            View All ({ITEMS.length})
          </button>
        </div>

      </div>

      {/* Grid Lightbox Modal for All 34 Testimonials */}
      <AnimatePresence>
        {showAllModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setShowAllModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-6xl max-h-[85vh] glass rounded-3xl border border-white/10 p-6 md:p-8 flex flex-col gap-6 overflow-hidden relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
                <div>
                  <span className="text-[10px] tracking-[0.3em] font-bold text-gold uppercase block">
                    FAN TESTIMONIALS ({ITEMS.length})
                  </span>
                  <h4 className="text-xl md:text-3xl font-serif-lux italic text-white">
                    Voices of the Community
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllModal(false)}
                  className="p-2.5 rounded-full glass hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Grid Content with native Lenis scroll prevention */}
              <div 
                data-lenis-prevent
                data-lenis-prevent-touch
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto custom-scrollbar touch-auto overscroll-contain pr-2 max-h-[68vh]"
              >
                {ITEMS.map((item, idx) => (
                  <div
                    key={`modal-${item.id}`}
                    onClick={() => {
                      setActiveIndex(idx);
                      setShowAllModal(false);
                    }}
                    className="glass rounded-2xl p-5 border border-white/10 hover:border-gold/40 transition-all flex flex-col justify-between cursor-pointer hover:scale-[1.02]"
                  >
                    <div className="mb-4">
                      <Quote className="w-5 h-5 text-gold/50 mb-2" />
                      <p className="text-xs md:text-sm text-white/90 font-serif-lux italic leading-relaxed text-left">
                        “{item.quote}”
                      </p>
                    </div>

                    <div className="flex items-center gap-3 border-t border-white/10 pt-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${item.avatarColor} shrink-0 shadow-md`} />
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          {item.name}
                        </span>
                        <span className="text-[9px] text-gold/80 font-mono tracking-widest uppercase">
                          {item.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
