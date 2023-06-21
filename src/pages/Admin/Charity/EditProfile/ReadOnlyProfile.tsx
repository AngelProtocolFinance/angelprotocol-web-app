import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Profile as TProfile } from "services/types";
import Icon from "components/Icon";
import Image from "components/Image";
import RichText from "components/RichText";
import { KeyValue as KV, Tooltip } from "components/admin";
import { appRoutes } from "constants/routes";
import { useAdminContext } from "../../Context";
import Group from "./common/Group";

export default function ReadOnlyProfile({
  tooltip,
  ...p
}: TProfile & { tooltip: string }) {
  const { id } = useAdminContext<"charity">();
  return (
    <div className="w-full max-w-4xl justify-self-center grid content-start gap-6 mt-6 font-body">
      <Link
        to={`${appRoutes.profile}/${id}`}
        className="text-blue hover:text-orange text-sm flex items-center gap-1"
      >
        <Icon type="Back" />
        <span>Back to profile</span>
      </Link>
      <Tooltip tooltip={tooltip} />
      <p>
        This profile is{" "}
        <span className="text-sm font-bold uppercase t">
          {p.published ? "Published" : "Not published"}
        </span>{" "}
      </p>
      <Group title="Public profile information">
        <KV name="Name" value={p.name} />
        <KV name="Tagline" value={p.tagline} />
        <KV name="Registration number " value={p.registration_number} />

        <Label classes="-mb-4">Banner</Label>
        <Image src={p.image} className="mb-4 w-full aspect-[4/1]" />

        <Label classes="-mb-4">Logo</Label>
        <Image src={p.logo} className="mb-4 w-28 sm:w-48 aspect-square" />

        <Label classes="-mb-4">Description of your organization</Label>
        <RichText
          readOnly={true}
          content={p.overview ?? ""}
          classes={{
            container:
              "rich-text-toolbar border border-prim text-sm grid grid-rows-[auto_1fr] rounded bg-orange-l6 dark:bg-blue-d7 p-3 min-h-[15rem]",
            charCounter: "text-gray-d1 dark:text-gray",
          }}
        />

        <KV name="Website" value={p.url} />
      </Group>

      <Group title="Organization">
        {p.type === "endowment" && (
          <>
            <KV
              name="Aligned SDG"
              value={p.categories.sdgs.reduce(
                (prev, curr) => prev + `, ${curr}`,
                ""
              )}
            />
            <KV name="Endowment designation" value={p.endow_designation} />
          </>
        )}

        <KV name="Headquarters" value={p.hq_country} />
        <KV
          name="Active countries"
          value={
            p.active_in_countries
              ? p.active_in_countries.reduce(
                  (prev, curr) => prev + `, ${curr}`,
                  ""
                )
              : undefined
          }
        />
        <KV name="Address" value={p.street_address} />
      </Group>

      <Group title="Social Media">
        <KV name="Facebook" value={p.hq_country} />
        <KV name="Linkedin" value={p.hq_country} />
        <KV name="Discord" value={p.hq_country} />
        <KV name="Instagram" value={p.hq_country} />
        <KV name="Youtube" value={p.hq_country} />
        <KV name="Tiktok" value={p.hq_country} />
      </Group>
    </div>
  );
}

function Label({
  classes = "",
  children,
}: PropsWithChildren<{ classes?: string }>) {
  return <span className={`text-sm font-bold ${classes}`}>{children}</span>;
}
