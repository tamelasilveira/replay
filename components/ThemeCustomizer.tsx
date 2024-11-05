'use client'
import React, { useState } from 'react';
import {
    Music, Heart, Share2, Plus, Search, Settings, X, Minimize2, Maximize2,
    Wallet, Upload, Store, LineChart, Award, Edit
} from 'lucide-react';

export const ThemeCustomizer = () => {
    const themes = [
        { name: 'Y2K Purple', bg: 'from-purple-100 via-pink-100 to-blue-100' },
        { name: 'Vaporwave', bg: 'from-pink-100 via-purple-100 to-blue-200' },
        { name: 'Cyber', bg: 'from-cyan-100 via-blue-100 to-purple-100' }
    ];

    return (
        <div className="p-4">
            <h3 className="text-purple-700 font-bold mb-4">Theme Selection</h3>
            <div className="grid grid-cols-2 gap-4">
                {themes.map(theme => (
                    <button
                        key={theme.name}
                        className={`p-4 rounded-lg bg-gradient-to-br ${theme.bg} 
            border-2 border-purple-300 hover:border-purple-500`}
                    >
                        {theme.name}
                    </button>
                ))}
            </div>
        </div>
    );
};