// Vercel Serverless Function: /api/jormass-acceptance
// Handles institutional acceptance, validation, server-side fee calculations, Resend email dispatch, and audit logging.

interface AcceptancePayload {
  clientName?: string;
  clientRole?: string;
  clientOrg?: string;
  clientEmail?: string;
  clientNotes?: string;
  chosenDemo?: string;
  chosenPackage?: string;
  authorityConfirmed?: boolean;
  commercialTermsConfirmed?: boolean;
}

const PACKAGE_TIERS: Record<
  string,
  { name: string; title: string; fee: number; formatted: string; deposit: number; depositFormatted: string; balance: number; balanceFormatted: string }
> = {
  basic: {
    name: 'Basic',
    title: 'Basic — Design & Handover (Client Self-Hosted)',
    fee: 250000,
    formatted: '₦250,000',
    deposit: 125000,
    depositFormatted: '₦125,000',
    balance: 125000,
    balanceFormatted: '₦125,000',
  },
  launch: {
    name: 'Launch',
    title: 'Launch — Design + Deployment + 2-Year Cloud Hosting & Domain',
    fee: 350000,
    formatted: '₦350,000',
    deposit: 175000,
    depositFormatted: '₦175,000',
    balance: 175000,
    balanceFormatted: '₦175,000',
  },
  professional: {
    name: 'Professional',
    title: 'Professional — Journal CMS Platform + Publications & Events [RECOMMENDED]',
    fee: 485000,
    formatted: '₦485,000',
    deposit: 242500,
    depositFormatted: '₦242,500',
    balance: 242500,
    balanceFormatted: '₦242,500',
  },
  advanced: {
    name: 'Advanced',
    title: 'Advanced — Enterprise Digital Platform & Custom Migrations',
    fee: 650000,
    formatted: 'from ₦650,000',
    deposit: 325000,
    depositFormatted: 'from ₦325,000',
    balance: 325000,
    balanceFormatted: 'from ₦325,000',
  },
};

const DEMO_NAMES: Record<string, string> = {
  demo1: 'Demo 1 — Heritage Academic (Traditional Journal Spine & Scholarly Rail)',
  demo2: 'Demo 2 — Contemporary Research (Topic Discovery & Taxonomy Filter)',
  demo3: 'Demo 3 — Scholarly Discovery Platform (Deep Navy & Royal Purple Academic Discovery)',
  custom: 'Custom Hybrid / Specific Requested Adjustments',
};

// In-memory fallback audit log for serverless invocations
const serverlessAuditLog: any[] = [];

export default async function handler(req: any, res: any) {
  // Always enforce application/json
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      service: 'JORMASS Commercial Acceptance API',
      status: 'operational',
      timestamp: new Date().toISOString(),
      governingLaw: 'Laws of the Federal Republic of Nigeria',
      contractRecipient: 'editorial@jormass.com',
      notificationRecipient: 'onlinefirst2026@gmail.com',
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed. Please use POST.`,
      errorCode: 'SUBMISSION-ERROR-METHOD',
    });
  }

  try {
    let body: AcceptancePayload = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({
          success: false,
          error: 'Invalid JSON payload received.',
          errorCode: 'SUBMISSION-ERROR-JSON-PARSE',
        });
      }
    }

    const {
      clientName = '',
      clientRole = '',
      clientOrg = 'JORMASS — Journal of Research in Management and Social Sciences',
      clientEmail = '',
      clientNotes = '',
      chosenDemo = 'demo3',
      chosenPackage = 'professional',
      authorityConfirmed = false,
      commercialTermsConfirmed = false,
    } = body || {};

    // 1. Validation of Required Fields
    const trimmedName = clientName.trim();
    const trimmedRole = clientRole.trim();
    const trimmedEmail = clientEmail.trim();
    const trimmedOrg = clientOrg.trim() || 'JORMASS';

    if (!trimmedName) {
      return res.status(400).json({
        success: false,
        error: 'Authorized representative full name is required.',
        errorCode: 'SUBMISSION-ERROR-MISSING-NAME',
      });
    }

    if (!trimmedRole) {
      return res.status(400).json({
        success: false,
        error: 'Official position / role is required.',
        errorCode: 'SUBMISSION-ERROR-MISSING-ROLE',
      });
    }

    if (!trimmedEmail || !trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      return res.status(400).json({
        success: false,
        error: 'A valid official email address is required.',
        errorCode: 'SUBMISSION-ERROR-INVALID-EMAIL',
      });
    }

    if (!authorityConfirmed) {
      return res.status(400).json({
        success: false,
        error: 'Confirmation of authority to make this selection on behalf of JORMASS is mandatory.',
        errorCode: 'SUBMISSION-ERROR-UNCONFIRMED-AUTHORITY',
      });
    }

    if (!commercialTermsConfirmed) {
      return res.status(400).json({
        success: false,
        error: 'Agreement to commercial terms, project fees, and the 50% initial payment is mandatory.',
        errorCode: 'SUBMISSION-ERROR-UNCONFIRMED-TERMS',
      });
    }

    // 2. Server-side Package & Fee Validation
    const selectedPkg = PACKAGE_TIERS[chosenPackage] || PACKAGE_TIERS.professional;
    const selectedDemoTitle = DEMO_NAMES[chosenDemo] || `Selected Concept (${chosenDemo})`;

    const totalFee = selectedPkg.fee;
    const depositAmount = selectedPkg.deposit;
    const balanceAmount = selectedPkg.balance;

    // 3. Generate Reference: OF-JORMASS-YYYYMMDD-XXXX
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const reference = `OF-JORMASS-${dateStr}-${randomHex}`;

    const submissionTimestamp = now.toISOString();
    const formattedDate = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const formattedTime = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
    const termsVersion = 'JORMASS-COMMERCIAL-TERMS-v1.0';
    const governingLaw = 'Laws of the Federal Republic of Nigeria';
    const contractRecipientEmail = 'editorial@jormass.com';
    const onlineFirstEmail = process.env.NOTIFICATION_EMAIL_RECIPIENT || 'onlinefirst2026@gmail.com';

    // 4. Construct OnlineFirst Formal Email Body
    const emailBody = `ONLINEFIRST STUDIO
JORMASS PROJECT DIRECTION & COMMERCIAL ACCEPTANCE

Reference Number: ${reference}
Date: ${formattedDate}
Time: ${formattedTime}
Timestamp (UTC): ${submissionTimestamp}

CLIENT IDENTIFICATION
Client Organisation: ${trimmedOrg}
Authorised Representative: ${trimmedName}
Official Position: ${trimmedRole}
Representative Email: ${trimmedEmail}
Formal Contract Recipient: ${contractRecipientEmail}

SELECTED PROJECT DIRECTION
Preferred Design: ${selectedDemoTitle}
Selected Implementation Package: ${selectedPkg.title}

COMMERCIAL TERMS & INVESTMENT
Total Project Fee: ${selectedPkg.formatted}
50% Initial Payment Required: ${selectedPkg.depositFormatted}
Balance Due Upon Final Deployment: ${selectedPkg.balanceFormatted}

COMMERCIAL ACCEPTANCE & DECLARATIONS
Authority Confirmation: YES (Confirmed by ${trimmedName})
Commercial Terms Accepted: YES (50% Initial Payment agreed)
Terms Version: ${termsVersion}
Governing Law: ${governingLaw}

CLIENT IMPLEMENTATION NOTES / ADJUSTMENTS:
${clientNotes.trim() || 'No specific custom adjustments requested at this time.'}

MANDATORY NEXT STEP:
OnlineFirst Studio will prepare and dispatch the formal commercial project agreement to ${contractRecipientEmail} and cc ${trimmedEmail}. Work commences upon contract execution and confirmation of the 50% initial payment.

Audit Ref: ${reference} | ${termsVersion}`;

    // 5. Client Acknowledgement Email Body
    const clientAckBody = `Dear ${trimmedName},

Thank you for confirming the project direction and commercial terms for the Journal of Research in Management and Social Sciences (JORMASS) academic publishing platform.

Your commercial acceptance has been formally recorded under Reference: ${reference}.

SUMMARY OF RECORDED SELECTION:
• Preferred Design: ${selectedDemoTitle}
• Implementation Package: ${selectedPkg.title}
• Total Project Fee: ${selectedPkg.formatted}
• 50% Initial Payment (Due upon agreement): ${selectedPkg.depositFormatted}
• Balance Upon Delivery: ${selectedPkg.balanceFormatted}
• Formal Contract Email: ${contractRecipientEmail}

NEXT STEPS:
OnlineFirst Studio will issue the detailed project agreement to ${contractRecipientEmail} and copy your email address (${trimmedEmail}). Implementation begins promptly upon contract finalization and receipt of the 50% deposit.

Should you require any immediate clarification, please contact OnlineFirst Studio at onlinefirst2026@gmail.com.

Sincerely,
OnlineFirst Studio | Academic Systems Engineering
Reference: ${reference}`;

    // 6. Transactional Email Dispatch via Resend (if configured)
    let emailStatus = 'dispatched_and_recorded';
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        // Notification to OnlineFirst Studio & editorial@jormass.com
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'OnlineFirst Studio <notifications@resend.dev>',
            to: [onlineFirstEmail, contractRecipientEmail],
            subject: `JORMASS — Design & Commercial Acceptance Confirmed — ${reference}`,
            text: emailBody,
          }),
        });

        // Acknowledgement to Client
        if (resendRes.ok) {
          try {
            await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${resendApiKey}`,
              },
              body: JSON.stringify({
                from: 'OnlineFirst Studio <notifications@resend.dev>',
                to: [trimmedEmail],
                subject: `Acknowledgement: JORMASS Project Direction & Commercial Terms Confirmed — ${reference}`,
                text: clientAckBody,
              }),
            });
            emailStatus = 'delivered_via_resend';
          } catch (clientMailErr) {
            console.warn('Client acknowledgement send notice:', clientMailErr);
          }
        } else {
          const errText = await resendRes.text();
          console.warn('Resend notification dispatch warning:', errText);
          emailStatus = 'logged_local_dispatch';
        }
      } catch (mailErr) {
        console.error('Email transmission error:', mailErr);
        emailStatus = 'logged_local_dispatch';
      }
    } else {
      console.log(`[ONLINEFIRST AUDIT DISPATCH] Reference: ${reference}`);
      console.log(emailBody);
      emailStatus = 'logged_local_dispatch';
    }

    // 7. Store Audit Record
    const record = {
      reference,
      referenceId: reference,
      project: 'JORMASS Academic Publishing Redesign',
      clientOrg: trimmedOrg,
      clientName: trimmedName,
      clientRole: trimmedRole,
      clientEmail: trimmedEmail,
      clientNotes: clientNotes.trim(),
      chosenDemo,
      chosenDemoTitle: selectedDemoTitle,
      chosenPackage,
      chosenPackageTitle: selectedPkg.title,
      totalFee,
      totalFeeFormatted: selectedPkg.formatted,
      depositPercentage: 50,
      depositAmount,
      depositAmountFormatted: selectedPkg.depositFormatted,
      balanceAmount,
      balanceAmountFormatted: selectedPkg.balanceFormatted,
      authorityConfirmed: true,
      commercialTermsConfirmed: true,
      termsVersion,
      governingLaw,
      contractRecipientEmail,
      submittedAt: submissionTimestamp,
      emailStatus,
      summaryText: emailBody,
    };

    serverlessAuditLog.unshift(record);

    // 8. Return Valid JSON Success Response
    return res.status(200).json({
      success: true,
      reference,
      referenceId: reference,
      message: 'Selection recorded successfully',
      record,
      recipients: {
        onlineFirst: onlineFirstEmail,
        formalContract: contractRecipientEmail,
        client: trimmedEmail,
      },
    });
  } catch (err: any) {
    console.error('API Error in /api/jormass-acceptance:', err);
    return res.status(500).json({
      success: false,
      error: 'Unable to record selection due to a server error. Please retry or contact OnlineFirst Studio.',
      errorCode: 'SUBMISSION-ERROR-SERVER-500',
    });
  }
}
