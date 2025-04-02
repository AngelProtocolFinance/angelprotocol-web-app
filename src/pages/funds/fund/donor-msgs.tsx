import { laira } from "assets/laira/laira";
import Image from "components/image";

type Donor = {
  id: string;
  name: string;
  avatar: string | null;
  avatarLetter?: string;
  avatarColor?: string;
  donationCount: number;
  note?: string;
};
const donors: Donor[] = [
  {
    id: "1",
    name: "Moaawia Sanadiki",
    avatar: null,
    avatarLetter: "M",
    avatarColor: "bg-green-l3",
    donationCount: 1,
    note: "Thank you for your generous support!",
  },
  {
    id: "2",
    name: "Nourin Ghazi",
    avatar: null,
    avatarLetter: "N",
    avatarColor: "bg-green-l3",
    donationCount: 1,
    note: "Your contribution makes a difference!",
  },
  {
    id: "3",
    name: "Becky Bartness",
    avatar: null,
    avatarLetter: "B",
    avatarColor: "bg-green-l3",
    donationCount: 1,
    note: "Proud to be part of this mission!",
  },
  {
    id: "4",
    name: "Taha Mokaddem",
    avatar: null,
    avatarLetter: "T",
    avatarColor: "bg-blue-l1",
    donationCount: 1,
    note: "Let's continue making a difference!",
  },
  {
    id: "5",
    name: "Estuardo Alvarez",
    avatar: null,
    avatarLetter: "E",
    avatarColor: "bg-blue-d1",
    donationCount: 1,
    note: "Every effort counts. Thank you all!",
  },
  {
    id: "6",
    name: "Fatiha Elmaslouhi",
    avatar: null,
    avatarLetter: "F",
    avatarColor: "bg-green-l3",
    donationCount: 2,
    note: "Grateful to be part of this journey!",
  },
  {
    id: "7",
    name: "Liam Johnson",
    avatar: null,
    avatarLetter: "L",
    avatarColor: "bg-yellow-l2",
    donationCount: 3,
    note: "Amazing work! Keep it up!",
  },
  {
    id: "8",
    name: "Sophia Martinez",
    avatar: null,
    avatarLetter: "S",
    avatarColor: "bg-red-l3",
    donationCount: 1,
    note: "Together, we can achieve great things.",
  },
  {
    id: "9",
    name: "Oliver Brown",
    avatar: null,
    avatarLetter: "O",
    avatarColor: "bg-purple-l2",
    donationCount: 4,
    note: "A small step for me, a giant leap for the cause.",
  },
  {
    id: "10",
    name: "Emma Wilson",
    avatar: null,
    avatarLetter: "E",
    avatarColor: "bg-orange-l3",
    donationCount: 2,
    note: "Happy to contribute to this wonderful initiative!",
  },
  {
    id: "11",
    name: "Noah Davis",
    avatar: null,
    avatarLetter: "N",
    avatarColor: "bg-teal-l2",
    donationCount: 1,
    note: "Keep inspiring and making a difference.",
  },
  {
    id: "12",
    name: "Ava Garcia",
    avatar: null,
    avatarLetter: "A",
    avatarColor: "bg-pink-l1",
    donationCount: 5,
    note: "Every donation counts, no matter how small.",
  },
];

interface Props {
  classes?: string;
  id: string;
}

export function DonorMsgs({ classes = "" }: Props) {
  return (
    <div className={`${classes} w-full bg-white rounded-sm @container`}>
      <h2 className="text-xl font-bold mb-2">Donors</h2>
      <div className="grid gap-y-4 sm:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4">
        {donors.map((donor) => (
          <div
            key={donor.id}
            className="flex items-start gap-4 border border-gray-l3 p-4 rounded-lg"
          >
            <Image
              src={laira.standing}
              alt={donor.name}
              height={25}
              width={25}
              className="shrink-0 object-contain"
            />

            <div>
              <p className="text-nowrap text-sm font-semibold">{donor.name}</p>
              {donor.note && <p className="text-gray mt-1">{donor.note}</p>}
            </div>
          </div>
        ))}
      </div>

      <button className="text-blue font-medium mt-4 hover:text-blue-d1">
        View more
      </button>
    </div>
  );
}
