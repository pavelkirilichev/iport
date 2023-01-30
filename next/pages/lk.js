import Header from "../components/Header";
import Footer from "../components/Footer";
import LK_1 from "../components/LK_1";
import LK_2 from "../components/LK_2";
import LK_3 from "../components/LK_3";
import LK_4 from "../components/LK_4";
import { useState } from "react";
import { getCookies } from "cookies-next";

export function getServerSideProps({ req, res }) {
  return {
    props: {
      cookies: getCookies({ req, res }),
    },
  };
}

function LK() {
  const [chapter, setChapter] = useState(2);
  const [pullMenuMob, setPullMenuMob] = useState("");
  const [pull, setPull] = useState("");
  let section;
  if (chapter == 1) {
    section = <LK_1 setChapter={setChapter} />;
  }
  if (chapter == 2) {
    section = <LK_2 setChapter={setChapter} />;
  }
  if (chapter == 3) {
    section = <LK_3 setChapter={setChapter} />;
  }
  if (chapter == 4) {
    section = <LK_4 setChapter={setChapter} />;
  }

  return (
    <div className="wrapper">
      <Header
        cartPrice={2120}
        pull={pull}
        setPull={setPull}
        pullMenuMob={pullMenuMob}
        setPullMenuMob={setPullMenuMob}
        cookies={cookies}
      />
      <section
        className={
          pull == "" && pullMenuMob == "" ? "lk__section-active" : "lk__section"
        }
      >
        {section}
      </section>
      <Footer />
    </div>
  );
}

export default LK;
