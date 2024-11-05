/* eslint-disable , @next/next/no-img-element, react/no-unescaped-entities,  */
/* eslint-disable,  @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";

const PlaylistCard = ({ playlist, onPurchase }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePurchase = () => {
    setIsModalOpen(true);
    onPurchase(playlist);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (

      <div className={cn("bg-white rounded-lg shadow-md p-4", "card", "bg-[url(https://bafkreihebtxhajjpn66bqusp7dty3elpz2u3smrjoicxkesdco6vjtmp7e.ipfs.flk-ipfs.xyz)] bg-cover")}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className={cn(
              "rounded-full w-10 h-10 mr-4 flex items-center justify-center",
                "bg-gradient-to-r from-cyan-500 to-blue-500",             
                "bg-[url(https://bafkreihebtxhajjpn66bqusp7dty3elpz2u3smrjoicxkesdco6vjtmp7e.ipfs.flk-ipfs.xyz)] bg-cover",
            )}
            style={{ backgroundColor: getRandomColor() }}
          >
            <span className="text-white font-bold">                          
            </span>
          </div>
            <h3 className="text-lg font-medium truncate">{playlist.creator.slice(0, 5) + '...' + playlist.creator.slice(-4)}</h3>
        </div>
        <div className="flex items-center">
          <span className="text-dark-600 mr-2">{playlist.plays} plays</span>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handlePurchase}
          >
            <ShoppingCart className="inline-block mr-2" />
            Purchase
          </button>
        </div>
      </div>
      <div className="mt-4">
              <p className="text-dark-600  truncate"></p>
        <p className="text-dark-600 font-medium">Price: {playlist.price} ETH</p>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">
              Purchase Playlist: {playlist.metadataURI}
            </h3>
            <p className="text-gray-600 font-medium mb-4">
              Price: {playlist.price} ETH
            </p>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
                onClick={() => {
                  handleCloseModal();
                  onPurchase(playlist);
                }}
              >
                Confirm Purchase
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistCard;