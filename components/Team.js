'use client';
import Image from "next/image";
import styles from "./Team.module.css";

export default function Team() {
  const testimonials = [
    {
      name: "Dr. Sarah Ahmed",
      role: "Healthcare Specialist",
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Omar Khan",
      role: "Government Health Advisor",
      img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Aisha Al-Mutairi",
      role: "Clinical Researcher",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Dr. Michael Rivera",
      role: "AI in Medicine Researcher",
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=90",
    },
    {
      name: "Dr. Alex Chen",
      role: "Biomedical Engineer",
      img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <section className={styles.teamSection} id="team">
      <div className={styles.teamWrap}>
        <h1 className={styles.teamTitle}>Meet Our Team</h1>
        <div className={styles.teamCards}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.teamCard}>
              <div className={styles.teamImgWrapper}>
                <Image
                  src={t.img}
                  alt={t.name}
                  width={120}
                  height={120}
                  className={styles.teamImg}
                />
              </div>
              <h4 className={styles.teamName}>{t.name}</h4>
              <span className={styles.teamRole}>{t.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
