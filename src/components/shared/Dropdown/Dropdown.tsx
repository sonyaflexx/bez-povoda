'use client'

import React, { useState } from 'react';

interface TabsProps {
    id: number;
    title: string;
    content: string;
}

function Dropdown({ tabs }: { tabs: TabsProps[] }) {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId === activeTab ? null : tabId);
  };

  return (
    <div className="font-public-sans font-medium">
      <div className="flex flex-col">
        {tabs.map((tab, index) => (
          <div key={index} className="mt-[52px] border-b border-[#717171]">
            <button
                key={index}
                className={`text-[24px] h-[74px] w-full`}
                onClick={() => handleTabClick(tab.id)}
            >
                <div className='flex w-full items-center'>
                    {tab.title}

                    <div className='ml-auto'>
                        <div className="relative">
                            <div className="absolute right-0 w-[25px] h-[2px] rounded-[48px] bg-[#292D32]" />
                            <div className={`absolute right-0 w-[25px] h-[2px] rounded-[48px] bg-[#292D32] transition-transform duration-300 ${activeTab !== tab.id ? 'rotate-90' : ''}`} />
                        </div>
                    </div>
                </div>
            </button>
            <div className={`overflow-hidden h-full ${activeTab === tab.id ? 'max-h-auto' : 'max-h-[0px]'}`} style={{ transition: 'max-height 2s ease' }}>
                <span className='pb-4 block'>{tab.content}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;