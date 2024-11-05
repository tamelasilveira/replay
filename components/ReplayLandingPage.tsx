"use client"

import React from "react"
import Link from "next/link"
import { Github, ListMusic, Music, Share2 } from "lucide-react"
import {useAccount } from 'wagmi'
import { toast } from "react-toastify"

export const ReplayLandingPage = () => {
  const account = useAccount();

  const copyToClipboard = () => {
    const domain = "replay.torridparadise.com"; 
    const linkToCopy = `https://${domain}/vibe/${account.address}`;
    console.log('link', account.address)
    navigator.clipboard.writeText(linkToCopy).then(() => {
      toast.success("Link copied to clipboard!");
    }).catch(err => {
      toast.error("Failed to copy link.");
      console.error('Copy failed:', err);
    });
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-400">
      {/* Navigation*/}
      <nav className="p-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="text-2xl font-bold text-purple-600">replay♪</div>
          <a className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all text-dark">
            <ListMusic size={20} />
            <span>
              <w3m-button />
            </span>
          </a>
        </div>
      </nav>

      {/* Hero Section*/}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <div className="inline-block animate-bounce">
            {/* <Sparkles className="w-12 h-12 text-yellow-400" />*/}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
            Replay
          </h1>

          <p className="text-xl md:text-2xl text-purple-800 max-w-2xl mx-auto">
            Create, share, and own your music playlists on the blockchain ✨
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link href="/vibe">
              <button className="px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all font-medium flex items-center gap-2">
                <Music className="w-5 h-5" />
                Launch App
              </button>
            </Link>
            <button className="px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all font-medium flex items-center gap-2" onClick={copyToClipboard}>
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Own Your Playlists",
              description:
                "Your playlists are truly yours as NFTs on the blockchain",
              icon: "💿",
            },
            {
              title: "Share & Earn",
              description:
                "Share your taste and earn rewards from your influence",
              icon: "💕",
            },
            {
              title: "Community Vibes",
              description: "Join a community of music lovers and creators",
              icon: "✨",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/30 backdrop-blur-sm p-6 rounded-xl hover:transform hover:-translate-y-1 transition-all"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-purple-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-purple-900">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-purple-800">
        <p>Made with 💜 by the Torrid Paradise</p>
      </footer>
    </div>
  )
}
