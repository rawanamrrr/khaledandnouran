"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Plus, Minus } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

import { Variants } from "framer-motion"

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
}

const slideUp: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
}

export default function RsvpSection() {
  const t = useTranslation()
  const [attendance, setAttendance] = useState("")
    const [name, setName] = useState("")
  const [guestCount, setGuestCount] = useState(1);
  const [guestNames, setGuestNames] = useState("")
  const [status, setStatus] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending...")

        const formData = {
        attendance,
        name,
        guestCount,
        guestNames
    }

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus(t('rsvpSuccess'))
                setName("")
        setGuestCount(0)
        setGuestNames("")
      } else {
        setStatus(t('rsvpError'))
      }
    } catch (error) {
      console.error(error)
      setStatus(t('rsvpError'))
    }
  }

  return (
    <motion.section 
      className="relative py-20 px-4 md:py-32 bg-gradient-to-b from-transparent via-accent/5 to-transparent"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2 className="font-luxury text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-6 tracking-wide" variants={slideUp}>
          {t('rsvpTitle')}
        </motion.h2>
        <motion.p className="font-luxury text-xl md:text-2xl text-muted-foreground font-light max-w-3xl italic mb-12" variants={slideUp}>
          {t('rsvpSubtitle')}
        </motion.p>

        <motion.div
          className="relative bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-md border-2 border-accent/20 rounded-3xl p-8 sm:p-10 md:p-14 shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-accent/30 rounded-tl-3xl"
            initial={{ x: -50, y: -50, opacity: 0 }}
            whileInView={{ x: 0, y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-accent/30 rounded-br-3xl"
            initial={{ x: 50, y: 50, opacity: 0 }}
            whileInView={{ x: 0, y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          
          <div className="relative z-10">
                                                <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4 text-center">
                <Label className="text-xl font-elegant text-foreground tracking-wider">{t('attendanceLabel')}</Label>
                <RadioGroup value={attendance} onValueChange={setAttendance} className="grid grid-cols-2 gap-4 pt-2">
                                    <Label htmlFor="attending" className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${attendance === 'attending' ? 'bg-accent/10 border-accent shadow-inner' : 'bg-background/50 border-accent/20 hover:border-accent hover:bg-accent/5'}`}>
                    <RadioGroupItem value="attending" id="attending" className="sr-only" />
                    <span className="text-lg font-medium">{t('attending')}</span>
                  </Label>
                                    <Label htmlFor="not_attending" className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${attendance === 'not_attending' ? 'bg-accent/10 border-accent shadow-inner' : 'bg-background/50 border-accent/20 hover:border-accent hover:bg-accent/5'}`}>
                    <RadioGroupItem value="not_attending" id="not_attending" className="sr-only" />
                    <span className="text-lg font-medium">{t('notAttending')}</span>
                  </Label>
                </RadioGroup>
              </div>

                            <motion.div
                animate={attendance ? 'visible' : 'hidden'}
                initial="hidden"
                variants={{
                  visible: { opacity: 1, height: 'auto', transition: { staggerChildren: 0.2, delayChildren: 0.1, duration: 0.4, ease: 'easeOut' } },
                  hidden: { opacity: 0, height: 0, transition: { duration: 0.4, ease: 'easeIn' } }
                }}
                className="overflow-hidden"
              >
                <div className="space-y-8 pt-8 border-t border-accent/20">
                  <motion.div variants={slideUp} className="space-y-2 text-left">
                    <Label htmlFor="name" className="text-lg font-medium text-foreground">{t('fullNameLabel')}</Label>
                    <Input id="name" placeholder={t('fullNamePlaceholder')} value={name} onChange={(e) => setName(e.target.value)} required className="bg-background/50 text-lg p-6 rounded-xl" />
                  </motion.div>

                  <motion.div
                    animate={attendance === 'not_attending' ? 'visible' : 'hidden'}
                    initial="hidden"
                    variants={{ visible: { opacity: 1, height: 'auto' }, hidden: { opacity: 0, height: 0 } }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="overflow-hidden text-center"
                  >
                    <p className="text-muted-foreground italic text-lg py-4">{t('sorryToMissYou')}</p>
                  </motion.div>

                  <motion.div
                    animate={attendance === 'attending' ? 'visible' : 'hidden'}
                    initial="hidden"
                    variants={{ visible: { opacity: 1, height: 'auto' }, hidden: { opacity: 0, height: 0 } }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-8">
                      <motion.div variants={slideUp} className="space-y-4 text-left">
                        <Label className="text-lg font-medium text-foreground">{t('guestCountLabel')}</Label>
                        <div className="flex items-center gap-4">
                          <Button type="button" variant="outline" size="icon" onClick={() => setGuestCount(Math.max(1, guestCount - 1))} className="rounded-full w-12 h-12 bg-background/50 hover:bg-accent/10 border-accent/30">
                            <Minus className="h-5 w-5" />
                          </Button>
                          <span className="text-2xl font-semibold text-foreground w-16 text-center">{guestCount}</span>
                          <Button type="button" variant="outline" size="icon" onClick={() => setGuestCount(guestCount + 1)} className="rounded-full w-12 h-12 bg-background/50 hover:bg-accent/10 border-accent/30">
                            <Plus className="h-5 w-5" />
                          </Button>
                        </div>
                      </motion.div>
                      <motion.div variants={slideUp} className="space-y-2 text-left">
                        <Label htmlFor="guest_names" className="text-lg font-medium text-foreground">{t('guestNamesLabel')}</Label>
                        <Textarea id="guest_names" placeholder={t('guestNamesPlaceholder')} value={guestNames} onChange={(e) => setGuestNames(e.target.value)} className="bg-background/50 text-lg p-4 min-h-[120px] rounded-xl" />
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div variants={slideUp} className="text-center pt-6">
                    <Button type="submit" size="lg" className="w-full md:w-auto font-bold tracking-wider text-lg px-12 py-7 rounded-full shadow-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 transform hover:scale-105">
                      {t('submitRsvp')}
                    </Button>
                    {status && <p className="mt-6 text-center text-lg text-accent font-medium">{status}</p>}
                  </motion.div>
                </div>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
