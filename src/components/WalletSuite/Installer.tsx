export default function Installer(props: { icon: string; link: string }) {
  return (
    <a href={props.link} target="_blank" rel="noopenner noreferrer">
      <img src={props.icon} className="w-5 h-5" alt="" />
    </a>
  );
}
