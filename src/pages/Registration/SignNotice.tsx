export default function SignatureNotice({ classes = "" }) {
  return (
    <div className={classes}>
      <h4>Thank you for registering your account!</h4>

      <p>You're almost done, we just need to take one final step.</p>

      <p>
        Angel Giving serves as a granting organization, accepting donations on
        behalf of our partner nonprofits and granting them out after processing
        and converting. This requires our partner nonprofits to be able to
        accept US tax-deductible donations.
      </p>

      <p>
        Angel Giving provides fiscal sponsorship services at market-leading cost
        for our partner organizations to enable this ability (2.9%). If you
        would like to proceed, please review and sign the following fiscal
        sponsorship agreement:
      </p>
    </div>
  );
}
