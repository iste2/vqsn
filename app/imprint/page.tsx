export default function ImprintPage() {
  return (
    <div className="flex justify-center">
      <div className="container max-w-3xl py-12 px-4">
        <article className="prose dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Imprint</h1>
          
          <div className="not-prose mb-12 space-y-1">
            <p className="font-medium">Lukas Nadenau Software</p>
            <p>Lukas Nadenau</p>
            <p>Meischenfeld 84a</p>
            <p>52076 Aachen</p>
            <p>Germany</p>
            <div className="pt-4 space-y-1">
              <p>
                <span className="font-medium">Phone: </span>
                <a href="tel:01633451961" className="hover:text-primary transition-colors">
                  +491633451961
                </a>
              </p>
              <p>
                <span className="font-medium">Email: </span>
                <a href="mailto:lukas.nadenau@gmail.com" className="hover:text-primary transition-colors">
                  lukas.nadenau@gmail.com
                </a>
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight mt-12">Disclaimer - Legal Notices</h2>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-medium mb-4">Right to Information and Withdrawal</h3>
              <p>
                You have the right to inquire about your collected personal data free of charge and immediately. 
                You can also withdraw your consent to use your provided personal data with future effect. 
                Please contact the service provider listed in the imprint.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-medium mb-4">Data Protection (General)</h3>
              <div className="space-y-4">
                <p>
                  When accessing our website, general information (server logfiles) is automatically collected, 
                  including your web browser, operating system, and Internet Service Provider. This data cannot 
                  identify you personally and is used for statistical evaluation to improve our website technically 
                  and content-wise. This collection is necessary to deliver website content correctly.
                </p>

                <p>
                  Website use is generally possible without providing personal data. Personal data (like name, 
                  address, email) is collected voluntarily when provided. This data won&apos;t be shared with third 
                  parties without your explicit consent.
                </p>

                <p>
                  If a contractual relationship is established, modified, or you make an inquiry, we collect and 
                  use necessary personal data (inventory data). We collect, process, and use personal data as 
                  required to enable website use (usage data). All personal data is stored only as long as needed 
                  for the stated purpose (processing inquiries or contract execution), considering tax and commercial 
                  retention periods. By order of competent authorities, we must provide information about this data 
                  for law enforcement, danger prevention, constitutional protection authorities, Military 
                  Counterintelligence Service, or intellectual property rights enforcement.
                </p>

                <p>
                  We explicitly note that internet data transmission (e.g., email communication) can have security 
                  gaps. Complete data protection cannot be guaranteed.
                </p>

                <p>
                  The use of contact data published under imprint obligation by third parties for sending unsolicited 
                  advertisements and information is prohibited. Exceptions apply to existing business relationships 
                  or with our consent.
                </p>

                <p>
                  The providers and third parties mentioned reserve the right to take legal action for unsolicited 
                  advertising information. The same applies to commercial use and data sharing.
                </p>
              </div>
            </section>
          </div>

          <p className="text-sm text-muted-foreground mt-12 pt-8 border-t">
            Generated using the Imprint Generator by HENSCHE Attorneys, Employment Law Firm.
          </p>
        </article>
      </div>
    </div>
  )
} 