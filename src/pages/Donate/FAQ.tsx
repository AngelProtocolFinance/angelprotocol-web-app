import { Disclosure } from "@headlessui/react";
import { DrawerIcon } from "components/Icon";

export default function FAQ({ classes = "" }) {
  return (
    <div
      className={
        classes +
        " md:border md:border-prim md:p-4 rounded font-work grid md:gap-4"
      }
    >
      {faqs.map((faq) => (
        <Disclosure>
          {({ open }) => (
            <>
              <div key={faq.id}>
                <Disclosure.Button className="flex items-start justify-between gap-2 mb-2 w-full">
                  <span
                    className={`text-left text-sm ${
                      open ? "font-semibold" : ""
                    }`}
                  >
                    {faq.question}
                  </span>
                  <DrawerIcon
                    isOpen={open}
                    className="shrink-0 -mt-0.5 text-xl"
                  />
                </Disclosure.Button>
                {open && (
                  <Disclosure.Panel
                    static
                    className="text-sm grid gap-3 text-gray-d1"
                  >
                    {faq.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </Disclosure.Panel>
                )}
              </div>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}

const faqs = [
  {
    id: 1,
    question: "How does Better Giving accept my donation?",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat, mauris ut bibendum ultricies, turpis nisi fermentum massa, at commodo odio velit nec ligula. Nunc aliquet nisl eu risus hendrerit, nec vehicula justo pharetra. Sed nec odio vel turpis luctus fringilla. Aliquam erat volutpat. Ut suscipit, lectus vitae ultrices eleifend, ligula nulla fermentum libero, vel efficitur odio lacus eu lectus. Vivamus tincidunt justo sed massa scelerisque, ac aliquam arcu auctor. Integer nec nunc quis nisl semper egestas id vel purus.",
      "Proin fringilla nisi vitae ligula bibendum cursus. Nullam eget nunc vitae mi ullamcorper malesuada vel id libero. Quisque scelerisque, nisi vel eleifend congue, augue neque dapibus lectus, vitae laoreet augue justo id felis. Praesent nec mauris ac nisl consequat ullamcorper. In hac habitasse platea dictumst. Fusce in sagittis dui. Morbi vestibulum dui ut elit volutpat, ac suscipit odio suscipit.",
      "Nam vel dapibus elit. In hac habitasse platea dictumst. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut in felis sit amet quam venenatis congue eu in elit. Sed nec metus ut nisl semper cursus. Proin in justo justo. Mauris vitae lacus a libero eleifend cursus. Sed nec enim et elit laoreet scelerisque. Sed congue ultricies tortor, vel ultricies arcu cursus vitae. Vivamus a libero ac dolor semper cursus a id odio.",
    ],
  },
  {
    id: 2,
    question: "Are there any fees?",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis, libero eu eleifend dictum, felis odio iaculis odio, vel tincidunt justo neque id ex. Fusce a justo eget justo malesuada aliquet.",
      "Proin accumsan volutpat justo, in vulputate nulla efficitur id. Integer at ullamcorper justo, ut mattis sapien. Suspendisse cursus, libero a vehicula facilisis, augue justo tincidunt ante, nec tincidunt mi ex eu felis.",
      "Donec tincidunt, risus at aliquam consequat, odio tortor fringilla nisl, a scelerisque turpis ligula id purus. Fusce vel justo euismod, tincidunt ligula ac, lacinia justo. Nullam commodo, risus nec euismod volutpat, est velit laoreet leo, vel elementum justo dui non ipsum.",
    ],
  },
  {
    id: 3,
    question: "Will I receive a tax-deductible receipt for my donation?",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis. Ut ante elit, commodo non ligula at, scelerisque tincidunt nulla. Nulla auctor, mauris eu euismod cursus, erat dui venenatis lacus, vel gravida purus ipsum nec augue. Sed vel risus a felis vulputate cursus. In hac habitasse platea dictumst.",
      "Vivamus gravida, turpis nec ultrices malesuada, odio libero venenatis purus, a facilisis lacus justo vel risus. Donec aliquam ligula nec ante efficitur hendrerit. Sed at tellus non dolor pharetra vulputate. Integer euismod ullamcorper ante, at aliquet justo suscipit non. Vestibulum tincidunt libero sed dolor ultricies facilisis.",
      "Proin vel nisi eu urna fermentum eleifend sit amet vitae ex. Sed at justo at nulla tempus interdum. Curabitur efficitur nisl ut est tristique, eu rhoncus nisi scelerisque. Quisque et luctus libero. Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      "Nunc non dolor vel tellus dictum efficitur nec vitae lacus. Fusce fermentum purus ut justo bibendum, ac aliquet nisl luctus. Etiam vel efficitur velit. Integer et urna eget ex lacinia sodales. Duis ultrices arcu at accumsan vulputate. Vivamus aliquet fringilla risus, vel interdum augue rhoncus vel.",
    ],
  },
];
