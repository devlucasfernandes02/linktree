import { useEffect, useState } from "react";
import { Social } from "../../components/social";
import MyPhoto from "../../assets/FotoLilas.png";

import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { db } from "../../services/firebaseConnection";
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinksProps {
  linkedin: string;
  github: string;
  instagram: string;
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef).then((snapshot) => {
        let lista = [] as LinkProps[];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color,
          });
        });

        setLinks(lista);
      });
    }

    loadLinks();
  }, []);

  useEffect(() => {
    function loadSocialLinks() {
      const docRef = doc(db, "social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            linkedin: snapshot.data()?.linkedin,
            github: snapshot.data()?.github,
            instagram: snapshot.data()?.instagram,
          });
        }
      });
    }

    loadSocialLinks();
  }, []);

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center ">
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-radial-1 opacity-50"></div>
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-radial-2 opacity-50"></div>

      <img
        className="animate rounded-full w-44 md:w-56 border-2 border-blue-900 shadow-custom-shadow mt-20 mb-4"
        src={MyPhoto}
        alt="Minha Foto"
      />

      <h1 className="md:text-4xl mb-4 text-3xl font-bold bg-gradient-to-b from-white to-yellow-100 bg-clip-text text-transparent">
        Lucas Fernandes
      </h1>
      <p className="text-gray-50 mb-5 hover:text-gray-300">DevOps Enginner</p>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            style={{ backgroundColor: link.bg }}
            key={link.id}
            className=" bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
          >
            <a href={link.url} target="blank">
              <p className="text-base md:text-lg" style={{ color: link.color }}>
                {link.name}
              </p>
            </a>
          </section>
        ))}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <section className="flex justify-center gap-3 my-4">
            <Social url={socialLinks?.linkedin}>
              <FaLinkedin size={35} color="#FFF" />
            </Social>

            <Social url={socialLinks?.github}>
              <FaGithub size={35} color="#FFF" />
            </Social>

            <Social url={socialLinks?.instagram}>
              <FaInstagram size={35} color="#FFF" />
            </Social>
          </section>
        )}
      </main>
      <footer className="mt-7 text-white flex items-center justify-center gap-2">
        <p className="flex items-center gap-1">
          © 2025 Desenvolvido por
          <a
            href="https://github.com/devlucasfernandes02"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 hover:underline flex items-center gap-1"
          >
            Lucas Fernandes <FaGithub size={20} />
          </a>
        </p>
      </footer>
    </div>
  );
}
