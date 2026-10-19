"use client";

import React, { useState } from "react";
import { portfolioData } from "@/portfolioData";
import { 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  ShieldCheck, 
  Key, 
  Send, 
  Copy, 
  Check, 
  Terminal, 
  Radio, 
  Lock, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from "lucide-react";
import { TacticalAudio } from "@/lib/utils";

const PGP_PUBLIC_KEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v5.11.0
Comment: NEMESIS RAW TACTICAL CLEARANCE LEVEL 5 KEY

mQGNBF/9t0EBDAC3v8...NEMESIS-DHANUSH-GURUDU...DEVIL-NET
z9x8Q2lWk0pYt4a7S6d1F3g9H8j2K5m3N0b4V7c1X8z2L5k9J
4h7G1f3D8s2A0p6O4i8U2y5T9r1E3w7Q0m6N2b8V4c9X1z3L
=8d9F
-----END PGP PUBLIC KEY BLOCK-----`;

export default function ContactInfoPage() {
  const { operative } = portfolioData;
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // CLI Message Transmitter State
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [transmissionMsg, setTransmissionMsg] = useState("");
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);
  const [transmittedSuccessfully, setTransmittedSuccessfully] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    TacticalAudio.playTerminalBeep(880, 0.04);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transmissionMsg.trim()) return;

    setIsTransmitting(true);
    setTransmissionLogs([
      "INITIALIZING SECURE SOCKET ON PORT 443...",
      "Generating ephemeral ECDH Curve25519 shared secret...",
      "Encrypting transmission payload via AES-256-GCM...",
    ]);
    TacticalAudio.playRadarPing();

    setTimeout(() => {
      setTransmissionLogs((prev) => [
        ...prev,
        "Routing through devil-net onion proxy mesh...",
        "Delivering packet to Dhanush Gurudu (Nemesis)...",
      ]);
      TacticalAudio.playTerminalBeep(750, 0.03);
    }, 700);

    setTimeout(() => {
      setIsTransmitting(false);
      setTransmittedSuccessfully(true);
      setTransmissionLogs((prev) => [
        ...prev,
        "TRANSMISSION DELIVERED SUCCESSFULLY. ACK RECVD [200 OK]",
        `PAYLOAD HASH: SHA256:${Math.random().toString(16).slice(2, 10).toUpperCase()}...B49F`,
      ]);
      TacticalAudio.playRadarPing();

      // Fallback mailto trigger for direct email client send
      const subject = encodeURIComponent(`Operative Transmission from ${senderName || "Unknown Operative"}`);
      const body = encodeURIComponent(
        `Agent/Sender: ${senderName}\nContact: ${senderEmail}\n\nMessage Payload:\n${transmissionMsg}`
      );
      window.open(`mailto:${operative.primaryEmail}?subject=${subject}&body=${body}`, "_blank");
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#282830] pb-5 gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-tactical-orange/20 text-tactical-orange border border-tactical-orange/40 uppercase">
              DIRECTORY // contact-info/
            </span>
            <span className="text-text-secondary text-xs font-mono">
              SECURE COMMS PROTOCOL v2.4
            </span>
          </div>
          <h1 className="text-3xl font-sans font-bold text-text-primary">
            ENCRYPTED TERMINAL COMMS & CHANNELS
          </h1>
          <p className="text-xs font-mono text-text-secondary">
            Primary Transmission Endpoints • Encrypted Email • Direct Telephony • Cryptographic PGP Verification
          </p>
        </div>

        {/* Live Operative Online Pill */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#141418] border border-tactical-orange/40 text-xs font-mono">
          <Radio className="w-3.5 h-3.5 text-tactical-orange animate-pulse" />
          <span className="text-text-secondary">STATUS:</span>
          <span className="text-tactical-orange font-bold">OPERATIVE ONLINE</span>
        </div>
      </div>

      {/* Main Grid: Channels Card (Left) & CLI Message Transmitter (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (6 cols): Direct Contact Channels & One-Click Copy */}
        <div className="lg:col-span-6 space-y-4 font-mono text-xs">
          {/* Channels Header */}
          <div className="text-orange-500 font-bold flex items-center space-x-2 pb-1">
            <Terminal className="w-4 h-4" />
            <span>PRIMARY COMMS FREQUENCIES // VERIFIED CHANNELS</span>
          </div>

          {/* 1. Primary Email */}
          <div className="p-4 rounded-2xl border border-white/5 border-l-2 border-l-orange-500/40 hover:border-l-orange-500 bg-black/40 backdrop-blur-md space-y-2 group transition-all">
            <div className="flex items-center justify-between text-[11px] text-text-secondary">
              <span className="flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-orange-500" />
                <span>PRIMARY EMAIL TRANSMISSION</span>
              </span>
              <span className="text-orange-400">INBOX MONITORED</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-bold text-text-primary font-mono select-all">
                {operative.primaryEmail}
              </span>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => copyToClipboard(operative.primaryEmail, "primaryEmail")}
                  className="p-1.5 rounded bg-white/5 border border-white/10 hover:border-orange-500 text-text-secondary hover:text-orange-400 transition-colors flex items-center space-x-1 text-[11px]"
                >
                  {copiedItem === "primaryEmail" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedItem === "primaryEmail" ? "COPIED" : "COPY"}</span>
                </button>
                <a
                  href={`mailto:${operative.primaryEmail}`}
                  className="p-1.5 rounded bg-orange-600 text-white hover:bg-orange-500 transition-colors"
                  title="Direct mailto"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* 2. Alternate Encrypted Email (ProtonMail) */}
          <div className="p-4 rounded-2xl border border-white/5 border-l-2 border-l-orange-500/40 hover:border-l-orange-500 bg-black/40 backdrop-blur-md space-y-2 group transition-all">
            <div className="flex items-center justify-between text-[11px] text-text-secondary">
              <span className="flex items-center space-x-1.5">
                <Lock className="w-3.5 h-3.5 text-orange-400" />
                <span>ALTERNATE ENCRYPTED EMAIL (PROTON)</span>
              </span>
              <span className="text-orange-400 font-bold">END-TO-END ZERO-ACCESS</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-bold text-orange-400 font-mono select-all">
                {operative.encryptedEmail}
              </span>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => copyToClipboard(operative.encryptedEmail, "protonEmail")}
                  className="p-1.5 rounded bg-white/5 border border-white/10 hover:border-orange-500 text-text-secondary hover:text-orange-400 transition-colors flex items-center space-x-1 text-[11px]"
                >
                  {copiedItem === "protonEmail" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedItem === "protonEmail" ? "COPIED" : "COPY"}</span>
                </button>
                <a
                  href={`mailto:${operative.encryptedEmail}`}
                  className="p-1.5 rounded bg-orange-600 text-white hover:bg-orange-500 transition-colors"
                  title="Direct mailto"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* 3. Direct Phone Telephony */}
          <div className="p-4 rounded-2xl border border-white/5 border-l-2 border-l-orange-500/40 hover:border-l-orange-500 bg-black/40 backdrop-blur-md space-y-2 group transition-all">
            <div className="flex items-center justify-between text-[11px] text-text-secondary">
              <span className="flex items-center space-x-1.5">
                <Phone className="w-3.5 h-3.5 text-orange-500" />
                <span>DIRECT SECURE CELLULAR VOICE / SMS</span>
              </span>
              <span className="text-text-secondary">TELEPHONY</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-bold text-text-primary font-mono select-all">
                {operative.phone}
              </span>
              <button
                onClick={() => copyToClipboard(operative.phone, "phone")}
                className="p-1.5 rounded bg-white/5 border border-white/10 hover:border-orange-500 text-text-secondary hover:text-orange-400 transition-colors flex items-center space-x-1 text-[11px]"
              >
                {copiedItem === "phone" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedItem === "phone" ? "COPIED" : "COPY"}</span>
              </button>
            </div>
          </div>

          {/* 4. GitHub & LinkedIn Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* GitHub */}
            <div className="p-4 rounded-xl border border-[#282830] bg-[#141418] space-y-2">
              <div className="flex items-center justify-between text-[11px] text-text-secondary">
                <span className="flex items-center space-x-1">
                  <Github className="w-3.5 h-3.5 text-tactical-orange" />
                  <span>GITHUB NODE</span>
                </span>
              </div>
              <div className="text-xs font-bold text-text-primary truncate">
                devil-net
              </div>
              <div className="flex items-center justify-between pt-1">
                <a
                  href={operative.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tactical-orange hover:underline text-[11px] font-bold flex items-center space-x-1"
                >
                  <span>VISIT PROFILE</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => copyToClipboard(operative.github, "github")}
                  className="text-text-secondary hover:text-tactical-orange p-1 rounded"
                  title="Copy GitHub URL"
                >
                  {copiedItem === "github" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="p-4 rounded-xl border border-[#282830] bg-[#141418] space-y-2">
              <div className="flex items-center justify-between text-[11px] text-text-secondary">
                <span className="flex items-center space-x-1">
                  <Linkedin className="w-3.5 h-3.5 text-tactical-orange" />
                  <span>LINKEDIN IDENTITY</span>
                </span>
              </div>
              <div className="text-xs font-bold text-text-primary truncate">
                dhanush-gurudu
              </div>
              <div className="flex items-center justify-between pt-1">
                <a
                  href={operative.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tactical-orange hover:underline text-[11px] font-bold flex items-center space-x-1"
                >
                  <span>CONNECT</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => copyToClipboard(operative.linkedin, "linkedin")}
                  className="text-text-secondary hover:text-tactical-orange p-1 rounded"
                  title="Copy LinkedIn URL"
                >
                  {copiedItem === "linkedin" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Simulated PGP Key Box */}
          <div className="p-4 rounded-2xl border border-white/5 border-l-2 border-l-orange-500/40 bg-black/40 backdrop-blur-md space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-tactical-orange font-bold flex items-center space-x-1">
                <Key className="w-3.5 h-3.5 text-tactical-orange" />
                <span>NEMESIS PGP PUBLIC KEY BLOCK [4096-BIT]</span>
              </span>
              <button
                onClick={() => copyToClipboard(PGP_PUBLIC_KEY, "pgp")}
                className="text-text-secondary hover:text-tactical-orange p-1 rounded flex items-center space-x-1 text-[10px]"
              >
                {copiedItem === "pgp" ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span>{copiedItem === "pgp" ? "KEY COPIED" : "COPY KEY"}</span>
              </button>
            </div>
            <pre className="text-[10px] text-[#7A7A8A] bg-[#08080A] p-2.5 rounded border border-[#202028] overflow-x-auto select-all leading-tight">
              {PGP_PUBLIC_KEY}
            </pre>
          </div>
        </div>

        {/* Right Column (6 cols): Minimalist Terminal Message Transmitter */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-2xl border border-white/5 border-l-2 border-l-orange-500 bg-black/40 backdrop-blur-md overflow-hidden font-mono text-xs">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0F0F13] border-b border-[#282830]">
              <div className="flex items-center space-x-2">
                <Terminal className="w-3.5 h-3.5 text-tactical-orange" />
                <span className="text-text-primary font-bold">
                  nemesis@devil-net:~/comms# transmit-message
                </span>
              </div>
              <span className="text-[10px] text-tactical-orange font-bold">
                PORT 443 [OPEN]
              </span>
            </div>

            {/* Transmitter Form */}
            <form onSubmit={handleTransmit} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-text-secondary text-[11px] block uppercase">
                  SENDER IDENTITY / CALLSIGN
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Recruiter, Security Researcher, Cyber Operative"
                  className="w-full bg-[#0A0A0D] border border-[#282830] focus:border-tactical-orange rounded-lg px-3 py-2 text-text-primary text-xs focus:outline-none placeholder:text-text-secondary/40 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-text-secondary text-[11px] block uppercase">
                  RETURN CONTACT FREQUENCY (EMAIL / MATRIX HANDLE)
                </label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="your.email@organization.com"
                  className="w-full bg-[#0A0A0D] border border-[#282830] focus:border-tactical-orange rounded-lg px-3 py-2 text-text-primary text-xs focus:outline-none placeholder:text-text-secondary/40 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-text-secondary text-[11px] block uppercase">
                  PAYLOAD / TRANSMISSION MESSAGE
                </label>
                <textarea
                  required
                  rows={4}
                  value={transmissionMsg}
                  onChange={(e) => setTransmissionMsg(e.target.value)}
                  placeholder="State your technical objective, project invitation, or security inquiry..."
                  className="w-full bg-[#0A0A0D] border border-[#282830] focus:border-tactical-orange rounded-lg px-3 py-2 text-text-primary text-xs focus:outline-none placeholder:text-text-secondary/40 font-mono resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isTransmitting}
                className="w-full py-2.5 px-4 rounded-lg bg-tactical-orange text-background hover:bg-glow-orange font-bold text-xs font-mono transition-all flex items-center justify-center space-x-2 shadow-orange-glow-sm disabled:opacity-50"
              >
                {isTransmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    <span>ENCRYPTING & TRANSMITTING...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>DISPATCH ENCRYPTED TRANSMISSION</span>
                  </>
                )}
              </button>
            </form>

            {/* Terminal Transmission Stream Output */}
            {transmissionLogs.length > 0 && (
              <div className="px-5 py-3 bg-[#08080B] border-t border-[#282830] space-y-1 text-[11px] font-mono">
                <div className="text-[10px] text-text-secondary">
                  TRANSMISSION CONSOLE LOG //
                </div>
                {transmissionLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={
                      log.includes("SUCCESSFULLY")
                        ? "text-emerald-400 font-bold"
                        : "text-tactical-orange"
                    }
                  >
                    ❯ {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
