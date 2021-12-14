export function saleAssetFromPair(asset_pair: any) {
  return asset_pair[0]?.info?.token ? asset_pair[0] : asset_pair[1];
}

export function nativeTokenFromPair(asset_pair: any) {
  return asset_pair[0]?.info?.native_token ? asset_pair[0] : asset_pair[1];
}
