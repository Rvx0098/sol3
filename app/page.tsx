"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    instagram: "",
    college: "",
    collector_interest: "",
  });

  async function handleSubmit() {
    if (
      !formData.name ||
      !formData.email ||
      !formData.college
    ) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("waitlist").insert([
      {
        name: formData.name,
        email: formData.email,
        instagram: formData.instagram,
        college: formData.college,
        collector_interest: formData.collector_interest,
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setSuccess(true);

    setFormData({
      name: "",
      email: "",
      instagram: "",
      college: "",
      collector_interest: "",
    });

    setTimeout(() => {
      setShowModal(false);
      setSuccess(false);
    }, 2000);
  }

  return (
    <>
      <main className="min-h-screen bg-black text-white">
        <nav className="flex justify-between items-center px-8 py-6">
          <h1 className="text-2xl font-bold">SOL3</h1>

          <button
            onClick={() => setShowModal(true)}
            className="border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition"
          >
            Become an Early Collector
          </button>
        </nav>

        <section className="flex flex-col items-center justify-center text-center px-6 mt-32">
          <p className="uppercase tracking-[8px] text-gray-500 text-sm mb-6">
            Verified Campus Marketplace
          </p>

          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            BUILT FOR
            <br />
            COLLECTORS
          </h1>

          <p className="max-w-2xl text-gray-400 text-lg mb-10">
            Buy, sell, trade and discover rare collectibles within trusted
            student communities.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition"
            >
              Become an Early Collector
            </button>

            <button className="border border-white px-8 py-4 rounded-full hover:bg-white hover:text-black transition">
              Learn More
            </button>
          </div>

          <div className="mt-8 text-gray-500 text-sm">
            First 100 collectors receive Founder Status
          </div>
        </section>

        <section className="mt-32 px-6">
          <h2 className="text-center text-3xl font-bold mb-12">
            Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              "Sneakers",
              "Pokemon Cards",
              "Gaming",
              "Watches",
              "Streetwear",
              "Manga",
              "Keyboards",
              "Collectibles",
            ].map((item) => (
              <div
                key={item}
                className="border border-gray-800 rounded-2xl p-6 text-center hover:border-white transition"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto mt-32 px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Founder Collector Program
          </h2>

          <p className="text-gray-400 mb-10">
            Join before launch and secure priority access to the SOL3 beta.
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="border border-zinc-800 rounded-2xl p-6">
              ✓ Early Access
            </div>

            <div className="border border-zinc-800 rounded-2xl p-6">
              ✓ Founder Badge
            </div>

            <div className="border border-zinc-800 rounded-2xl p-6">
              ✓ Beta Testing Access
            </div>

            <div className="border border-zinc-800 rounded-2xl p-6">
              ✓ Collector Community Access
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="mt-10 bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition"
          >
            Claim Founder Status
          </button>
        </section>

        <footer className="text-center text-gray-500 py-20 mt-32">
          SOL3 © 2026 • MIT Pune Beta
        </footer>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 w-full max-w-md">

            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">
                Early Collector Access
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {success && (
              <div className="mb-4 p-4 rounded-xl bg-green-900 text-green-300 text-center">
                🚀 Welcome Founder Collector!
              </div>
            )}

            <div className="space-y-4">

              <input
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full p-3 rounded-xl bg-black border border-zinc-700 outline-none"
              />

              <input
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full p-3 rounded-xl bg-black border border-zinc-700 outline-none"
              />

              <input
                placeholder="Instagram Username"
                value={formData.instagram}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    instagram: e.target.value,
                  })
                }
                className="w-full p-3 rounded-xl bg-black border border-zinc-700 outline-none"
              />

              <input
                placeholder="College"
                value={formData.college}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    college: e.target.value,
                  })
                }
                className="w-full p-3 rounded-xl bg-black border border-zinc-700 outline-none"
              />

              <input
                placeholder="What do you collect?"
                value={formData.collector_interest}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    collector_interest: e.target.value,
                  })
                }
                className="w-full p-3 rounded-xl bg-black border border-zinc-700 outline-none"
              />

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
              >
                {loading
                  ? "Joining..."
                  : "Claim Founder Badge"}
              </button>

              <p className="text-xs text-gray-500 text-center">
                First 100 collectors receive priority beta access.
              </p>

            </div>
          </div>

        </div>
      )}
    </>
  );
}