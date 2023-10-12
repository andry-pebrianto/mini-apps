import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { IconType } from "react-icons";
import {
  FaFacebook,
  FaSquareXTwitter,
  FaGithub,
  FaGoogle,
  FaLinux,
  FaDiscord,
} from "react-icons/fa6";
import _ from "lodash";

type CardType = {
  id: number;
  name: string;
  clicked: boolean;
  icon: IconType;
};

const cardsSample: CardType[] = [
  {
    id: 1,
    name: "facebook",
    clicked: false,
    icon: FaFacebook,
  },
  {
    id: 2,
    name: "facebook",
    clicked: false,
    icon: FaFacebook,
  },
  {
    id: 3,
    name: "twitter",
    clicked: false,
    icon: FaSquareXTwitter,
  },
  {
    id: 4,
    name: "twitter",
    clicked: false,
    icon: FaSquareXTwitter,
  },
  {
    id: 5,
    name: "github",
    clicked: false,
    icon: FaGithub,
  },
  {
    id: 6,
    name: "github",
    clicked: false,
    icon: FaGithub,
  },
  {
    id: 7,
    name: "google",
    clicked: false,
    icon: FaGoogle,
  },
  {
    id: 8,
    name: "google",
    clicked: false,
    icon: FaGoogle,
  },
  {
    id: 9,
    name: "linux",
    clicked: false,
    icon: FaLinux,
  },
  {
    id: 10,
    name: "linux",
    clicked: false,
    icon: FaLinux,
  },
  {
    id: 11,
    name: "discord",
    clicked: false,
    icon: FaDiscord,
  },
  {
    id: 12,
    name: "discord",
    clicked: false,
    icon: FaDiscord,
  },
];

export default function MatchingCard() {
  const [cards, setCards] = useState<CardType[]>(_.shuffle(cardsSample));
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [pending, setPending] = useState<boolean>(false);

  const cardClicked = (card: CardType) => {
    const cardCleaned = { ...card };

    // if selectedCard === null
    if (!selectedCard) {
      cardCleaned.clicked = true;
      setSelectedCard(cardCleaned);

      setCards(
        cards.map((card) =>
          card.id === cardCleaned.id ? { ...card, clicked: true } : card
        )
      );
    }

    // if selectedCard !== null
    else {
      // jika tebakan benar
      if (cardCleaned.name === selectedCard.name) {
        setCards(
          cards.map((card) =>
            card.id === cardCleaned.id ? { ...card, clicked: true } : card
          )
        );
        setSelectedCard(null);
      }

      // jika tebakan salah
      else {
        setPending(true);
        setCards(
          cards.map((card) =>
            card.id === cardCleaned.id ? { ...card, clicked: true } : card
          )
        );

        setTimeout(() => {
          setCards(
            cards.map((card) =>
              card.id === cardCleaned.id || card.id === selectedCard.id
                ? { ...card, clicked: false }
                : card
            )
          );
          setSelectedCard(null);

          setPending(false);
        }, 700);
      }
    }
  };

  return (
    <Fragment>
      <div className="container mt-4">
        <div className="d-flex justify-content-center align-items-center">
          <div>
            <Link className="btn btn-sm btn-primary me-2 mb-1" to={"/"}>
              ← Back
            </Link>
          </div>
          <h1 className="text-center">Matching Card</h1>
        </div>

        <div className="mt-4">
          <div className="row mx-auto" style={{ maxWidth: "600px" }}>
            <div className="row">
              {cards.map((card, index) => (
                <div key={index} className="col-4 text-center fs-2">
                  <div className="d-flex justify-content-center border border-2 border-success rounded-3 p-3 m-2">
                    {card.clicked ? (
                      <card.icon />
                    ) : (
                      <>
                        {pending ? (
                          <p className="fs-5 m-0">CLICK ME</p>
                        ) : (
                          <p
                            className="fs-5 m-0 cursor-pointer"
                            onClick={() => {
                              cardClicked(card);
                            }}
                          >
                            CLICK ME
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => {
                    setCards(_.shuffle(cardsSample));
                    setSelectedCard(null);
                  }}
                  style={{ width: "150px" }}
                >
                  RESET
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
