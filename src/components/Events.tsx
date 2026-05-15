import React, { useRef } from 'react';
import '../styles/Events.css';

const Events: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right'): void => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      const { current } = scrollRef;
      current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="row">
      <h2>Campaigns</h2>
      
      <div className="slider-wrapper">
        {/* Left Circle Button */}
        <button className="nav-btn left" onClick={() => scroll('left')}>❮</button>

        <div className="posters" ref={scrollRef}>
          <img className="poster" src="/ChatGPT Image May 6, 2026, 05_56_36 PM.png" alt="Campaign 1" />
        <img className="poster" src="/ChatGPT Image May 6, 2026, 05_56_36 PM.png" alt="Campaign 2" />
        <img className="poster" src="/ChatGPT Image May 6, 2026, 05_56_36 PM.png" alt="Campaign 3" />
        <img className="poster" src="/ChatGPT Image May 6, 2026, 05_56_36 PM.png" alt="Campaign 4" />
        <img className="poster" src="/ChatGPT Image May 6, 2026, 05_56_36 PM.png" alt="Campaign 5" />
        <img className="poster" src="/ChatGPT Image May 6, 2026, 05_56_36 PM.png" alt="Campaign 1" />
        <img className="poster" src="/ChatGPT Image May 6, 2026, 05_56_36 PM.png" alt="Campaign 2" />
        <img className="poster" src="/ChatGPT Image May 6, 2026, 05_56_36 PM.png" alt="Campaign 3" />
        <img className="poster" src="/ChatGPT Image May 6, 2026, 05_56_36 PM.png" alt="Campaign 4" />
        <img className="poster" src="/ChatGPT Image May 6, 2026, 05_56_36 PM.png" alt="Campaign 5" />
        </div>

        {/* Right Circle Button */}
        <button className="nav-btn right" onClick={() => scroll('right')}>❯</button>
      </div>
    </div>
  );
};

export default Events;