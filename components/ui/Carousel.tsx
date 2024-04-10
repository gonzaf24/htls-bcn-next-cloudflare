/* eslint-disable @next/next/no-img-element */
'use client';
import { Carousel as CarouselUI } from 'react-responsive-carousel';
import { CarouselProps } from '@/lib/definitions';
import styles from './Carousel.module.css';

export default function Carousel({ photos }: CarouselProps) {
  if (!photos) {
    return null;
  }

  return (
    <CarouselUI
      showThumbs={false}
      showStatus={false}
      className={styles.Carousel}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button onClick={onClickHandler} title={label} type="button" className={styles.PrevArrow}>
            <img src="/BackIcon.svg" alt="Previous" />
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button onClick={onClickHandler} title={label} type="button" className={styles.NextArrow}>
            <img src="/NextIcon.svg" alt="Next" />
          </button>
        )
      }
    >
      {photos?.map((image, index) => (
        <div key={index}>
          <img
            className={`h-full max-h-[250px] min-h-[200px] w-full max-w-[600px] object-cover sm:max-h-[350px] sm:max-w-[640px]`}
            src={image}
            alt="photo of the place that is being described"
          />
        </div>
      ))}
    </CarouselUI>
  );
}
