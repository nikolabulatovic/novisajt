'use client';

import { useState } from 'react';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

export default function AfterChoice() {
  const [activeSection, setActiveSection] = useState<
    'communities' | 'education'
  >('communities');

  const { backgroundImage, opacity = 0.8 } = sectionBackgrounds['after-choice'];

  return (
    <div className='min-h-screen flex items-center justify-center p-8 relative bg-black'>
      {backgroundImage && (
        <div className='absolute inset-0 w-full h-full overflow-hidden'>
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: `url('${backgroundImage}')`,
              opacity: opacity,
            }}
          />
          {/* Dark overlay for text visibility */}
          <div className='absolute inset-0 bg-black/50 pointer-events-none' />
        </div>
      )}

      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 left-1/2 w-96 h-96 bg-gray-800/5 rounded-full blur-3xl animate-pulse' />
      </div>

      <div className='relative z-10 max-w-4xl mx-auto w-full'>
        <div className='text-center space-y-12'>
          {/* Tabs */}
          <div className='flex justify-center space-x-4 mb-8'>
            <button
              onClick={() => setActiveSection('communities')}
              className={`cursor-pointer px-8 py-4 rounded-full transition-all duration-300 ${activeSection === 'communities'
                ? 'bg-gray-800/60 border-2 border-gray-600 text-gray-200'
                : 'bg-gray-900/30 border border-gray-800/50 text-gray-400 hover:bg-gray-800/40'
                }`}>
              Zajednice
            </button>
            <button
              onClick={() => setActiveSection('education')}
              className={`cursor-pointer px-8 py-4 rounded-full transition-all duration-300 ${activeSection === 'education'
                ? 'bg-gray-800/60 border-2 border-gray-600 text-gray-200'
                : 'bg-gray-900/30 border border-gray-800/50 text-gray-400 hover:bg-gray-800/40'
                }`}>
              Edukacija
            </button>
          </div>

          {/* Content */}
          <div className='bg-gray-900/40 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-gray-800/50 shadow-2xl'>
            {activeSection === 'communities' && (
              <div className='space-y-8'>
                <h2 className='text-3xl md:text-4xl font-light text-gray-200 mb-8'>
                  Online zajednice
                </h2>
                <div className='space-y-6 text-left'>
                  <div className='p-6 bg-gray-900/30 rounded-xl border border-gray-800/50'>
                    <h3 className='text-xl font-medium text-gray-300 mb-2'>
                      WhatsApp grupe
                    </h3>
                    <p className='text-gray-400'>
                      Pridruži se lokalnim vegan zajednicama
                    </p>
                  </div>
                  <div className='p-6 bg-gray-900/30 rounded-xl border border-gray-800/50'>
                    <h3 className='text-xl font-medium text-gray-300 mb-2'>
                      Telegram kanali
                    </h3>
                    <p className='text-gray-400'>
                      Edukativni sadržaj i podrška
                    </p>
                  </div>
                  <div className='p-6 bg-gray-900/30 rounded-xl border border-gray-800/50'>
                    <h3 className='text-xl font-medium text-gray-300 mb-2'>
                      Discord serveri
                    </h3>
                    <p className='text-gray-400'>
                      Aktivne zajednice za razmenu iskustava
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'education' && (
              <div className='space-y-8'>
                <h2 className='text-3xl md:text-4xl font-light text-gray-200 mb-8'>
                  Edukativni sadržaj
                </h2>
                <div className='space-y-6 text-left'>
                  <div className='p-6 bg-gray-900/30 rounded-xl border border-gray-800/50'>
                    <h3 className='text-xl font-medium text-gray-300 mb-2'>
                      Kako postati vegan
                    </h3>
                    <p className='text-gray-400 mb-4'>
                      Praktični vodiči i resursi
                    </p>
                    {/* SLIKA: Možda ilustracija hrane ili prirodnih proizvoda - minimalistička, tamna */}
                  </div>
                  <div className='p-6 bg-gray-900/30 rounded-xl border border-gray-800/50'>
                    <h3 className='text-xl font-medium text-gray-300 mb-2'>
                      Zašto vegan
                    </h3>
                    <p className='text-gray-400 mb-4'>
                      Etički, ekološki i zdravstveni razlozi
                    </p>
                  </div>
                  <div className='p-6 bg-gray-900/30 rounded-xl border border-gray-800/50'>
                    <h3 className='text-xl font-medium text-gray-300 mb-2'>
                      Govor Gary Yourofsky
                    </h3>
                    <p className='text-gray-400 mb-4'>
                      &quot;Najbolji govor koji ćeš ikada čuti&quot;
                    </p>
                  </div>
                  <div className='p-6 bg-gray-900/30 rounded-xl border border-gray-800/50'>
                    <h3 className='text-xl font-medium text-gray-300 mb-2'>
                      Dokumentarci
                    </h3>
                    <p className='text-gray-400'>
                      Preporučeni dokumentarni filmovi
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
