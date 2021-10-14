export enum Addresses {
  terra12crxq8nxml96e9h38fe67c4p76pc24l54zjzzh = "terra12crxq8nxml96e9h38fe67c4p76pc24l54zjzzh",
  terra1uwtk2hs65332emnjn8n9s8d3l692pgyqnew4dq = "terra1uwtk2hs65332emnjn8n9s8d3l692pgyqnew4dq",
  terra1qagm9wdnp6f76xy52llcjxmr4z8j4nhd9ethw8 = "terra1qagm9wdnp6f76xy52llcjxmr4z8j4nhd9ethw8",
  terra13nm3vyj6zfg2tdzsgq97ky6d6gtuty9mu025z3 = "terra13nm3vyj6zfg2tdzsgq97ky6d6gtuty9mu025z3",
  terra1d5phnyr7e7l44yaathtwrh4f4mv5agajcy508f = "terra1d5phnyr7e7l44yaathtwrh4f4mv5agajcy508f",
  terra1tkadaa8phaqnne20rzluhv8p57h23ku4n337ye = "terra1tkadaa8phaqnne20rzluhv8p57h23ku4n337ye",
  terra18y4lflmg0wnlkw4hvamp4l2hjv2cafy7dtcyn6 = "terra18y4lflmg0wnlkw4hvamp4l2hjv2cafy7dtcyn6",
  terra1c5luclcnzwhlf59c5w63yn034z6k9jrefx0swx = "terra1c5luclcnzwhlf59c5w63yn034z6k9jrefx0swx",
  terra1vqe93uv8lylkw4fc8m0xr89fv5xean29ftr0q2 = "terra1vqe93uv8lylkw4fc8m0xr89fv5xean29ftr0q2",
  terra1k6v33x6sc9chztxgyh859npz740gmn9d4rnfkz = "terra1k6v33x6sc9chztxgyh859npz740gmn9d4rnfkz",
  terra1xmkprc4p2wxjh9eh58rjf3ndllepnl7xezmuk4 = "terra1xmkprc4p2wxjh9eh58rjf3ndllepnl7xezmuk4",
  terra1xmeept4tj37qqsajws8r6tl7f5hskvvfg2fmd5 = "terra1xmeept4tj37qqsajws8r6tl7f5hskvvfg2fmd5",
  terra1zn8aqw3ypzvs8pzuadpqw5jw5rptxp4y08z7sr = "terra1zn8aqw3ypzvs8pzuadpqw5jw5rptxp4y08z7sr",
  terra1cmp87658s0c475dkyee2p8r9zsdjd628py4zav = "terra1cmp87658s0c475dkyee2p8r9zsdjd628py4zav",
  terra1kdd6f099dv4kr5xqp7sxcc7epledxmvyq8xnu3 = "terra1kdd6f099dv4kr5xqp7sxcc7epledxmvyq8xnu3",
}

export type Details = {
  //   icon: string;
  //   url: string;
  name: string;
  description: string;
};

export type Charities = {
  [key in Addresses]: Details;
};
