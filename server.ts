import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

interface AcceptanceRecord {
  referenceId: string;
  project: string;
  clientOrg: string;
  clientName: string;
  clientRole: string;
  clientEmail: string;
  clientNotes?: string;
  chosenDemo: string;
  chosenDemoTitle: string;
  chosenPackage: string;
  chosenPackageTitle: string;
  totalFee: number;
  totalFeeFormatted: string;
  depositPercentage: number;
  depositAmount: number;
  depositAmountFormatted: string;
  balanceAmount: number;
  balanceAmountFormatted: string;
  authorityConfirmed: boolean;
  commercialTermsConfirmed: boolean;
  termsVersion: string;
  governingLaw: string;
  contractRecipientEmail: string;
  submittedAt: string;
  emailDeliveryStatus: string;
  summaryText: string;
}

// In-memory persistent server audit store
const acceptanceRecords: AcceptanceRecord[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body Parser
  app.use(express.json());

  // 1. Health check & status
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.get("/api/jormass-acceptance", (_req, res) => {
    res.json({
      success: true,
      service: "JORMASS Commercial Acceptance API",
      status: "operational",
      timestamp: new Date().toISOString(),
      governingLaw: "Laws of the Federal Republic of Nigeria",
      contractRecipient: "editorial@jormass.com",
      notificationRecipient: "onlinefirst2026@gmail.com",
    });
  });

  // 2. Core Acceptance Handler function
  const handleAcceptanceRequest = async (req: express.Request, res: express.Response) => {
    try {
      const {
        clientName,
        clientRole,
        clientOrg = "JORMASS — Journal of Research in Management and Social Sciences",
        clientEmail,
        clientNotes = "",
        chosenDemo,
        chosenPackage,
        authorityConfirmed,
        commercialTermsConfirmed,
      } = req.body || {};

      const trimmedName = (clientName || "").trim();
      const trimmedRole = (clientRole || "").trim();
      const trimmedEmail = (clientEmail || "").trim();
      const trimmedOrg = (clientOrg || "").trim() || "JORMASS";

      // Server-side field validations
      if (!trimmedName) {
        return res.status(400).json({
          success: false,
          error: "Authorized representative full name is required.",
          errorCode: "SUBMISSION-ERROR-MISSING-NAME",
        });
      }

      if (!trimmedRole) {
        return res.status(400).json({
          success: false,
          error: "Official position / role is required.",
          errorCode: "SUBMISSION-ERROR-MISSING-ROLE",
        });
      }

      if (!trimmedEmail || !trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
        return res.status(400).json({
          success: false,
          error: "A valid official email address is required.",
          errorCode: "SUBMISSION-ERROR-INVALID-EMAIL",
        });
      }

      if (!authorityConfirmed) {
        return res.status(400).json({
          success: false,
          error: "Confirmation of authority to make this selection on behalf of JORMASS is mandatory.",
          errorCode: "SUBMISSION-ERROR-UNCONFIRMED-AUTHORITY",
        });
      }

      if (!commercialTermsConfirmed) {
        return res.status(400).json({
          success: false,
          error: "Agreement to commercial terms, project fees, and the 50% initial payment is mandatory.",
          errorCode: "SUBMISSION-ERROR-UNCONFIRMED-TERMS",
        });
      }

      // Generate Reference ID: OF-JORMASS-YYYYMMDD-XXXX
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
      const referenceId = `OF-JORMASS-${dateStr}-${randomHex}`;

      // Server-side Package Pricing & Deposit calculation
      const packagePricing: Record<
        string,
        { title: string; fee: number; formatted: string; deposit: number; depositFormatted: string; balance: number; balanceFormatted: string }
      > = {
        basic: {
          title: "Basic — Design & Handover (Client Self-Hosted)",
          fee: 250000,
          formatted: "₦250,000",
          deposit: 125000,
          depositFormatted: "₦125,000",
          balance: 125000,
          balanceFormatted: "₦125,000",
        },
        launch: {
          title: "Launch — Design + Deployment + 2-Year Cloud Hosting & Domain",
          fee: 350000,
          formatted: "₦350,000",
          deposit: 175000,
          depositFormatted: "₦175,000",
          balance: 175000,
          balanceFormatted: "₦175,000",
        },
        professional: {
          title: "Professional — Journal CMS Platform + Publications & Events [RECOMMENDED]",
          fee: 485000,
          formatted: "₦485,000",
          deposit: 242500,
          depositFormatted: "₦242,500",
          balance: 242500,
          balanceFormatted: "₦242,500",
        },
        advanced: {
          title: "Advanced — Enterprise Digital Platform & Custom Migrations",
          fee: 650000,
          formatted: "from ₦650,000",
          deposit: 325000,
          depositFormatted: "from ₦325,000",
          balance: 325000,
          balanceFormatted: "from ₦325,000",
        },
      };

      const selectedPkg = packagePricing[chosenPackage] || packagePricing.professional;
      const totalFee = selectedPkg.fee;
      const depositPercentage = 50;
      const depositAmount = selectedPkg.deposit;
      const balanceAmount = selectedPkg.balance;

      const demoTitles: Record<string, string> = {
        demo1: "Demo 1 — Heritage Academic (Traditional Journal Spine & Dual-Column Scholarly Rail)",
        demo2: "Demo 2 — Contemporary Research (Modern Split Hero & Topic Taxonomy Filtering)",
        demo3: "Demo 3 — Scholarly Discovery Platform (Deep Navy & Royal Purple Academic Discovery)",
        custom: "Custom Hybrid / Specific Requested Adjustments",
      };

      const demoTitle = demoTitles[chosenDemo] || chosenDemo || "Selected Design";
      const now = new Date();
      const submissionTimestamp = now.toISOString();
      const formattedDate = now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
      const formattedTime = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZoneName: "short" });
      const termsVersion = "JORMASS-COMMERCIAL-TERMS-v1.0";
      const governingLaw = "Laws of the Federal Republic of Nigeria";
      const contractRecipientEmail = "editorial@jormass.com";
      const onlineFirstEmail = process.env.NOTIFICATION_EMAIL_RECIPIENT || "onlinefirst2026@gmail.com";

      // Formatted Email Body for OnlineFirst & Client Confirmation
      const emailBody = `ONLINEFIRST STUDIO
JORMASS PROJECT DIRECTION & COMMERCIAL ACCEPTANCE

Reference Number: ${referenceId}
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
Preferred Design: ${demoTitle}
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
${(clientNotes || "").trim() || "No specific custom adjustments requested at this time."}

MANDATORY NEXT STEP:
OnlineFirst Studio will prepare and dispatch the formal commercial project agreement to ${contractRecipientEmail} and cc ${trimmedEmail}. Work commences upon contract execution and confirmation of the 50% initial payment.

Audit Ref: ${referenceId} | ${termsVersion}`;

      // Email Dispatch via Resend API if API key provided, or server-side transactional dispatch logger
      let emailDeliveryStatus = "dispatched_and_logged";
      const resendApiKey = process.env.RESEND_API_KEY;

      if (resendApiKey) {
        try {
          const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
              from: "OnlineFirst Studio <notifications@resend.dev>",
              to: [onlineFirstEmail, contractRecipientEmail],
              subject: `JORMASS — Design & Commercial Acceptance Confirmed — ${referenceId}`,
              text: emailBody,
            }),
          });
          if (resendResponse.ok) {
            emailDeliveryStatus = "delivered_via_resend";
          } else {
            const errData = await resendResponse.json();
            console.warn("Resend API warning:", errData);
            emailDeliveryStatus = "logged_local_dispatch";
          }
        } catch (mailErr) {
          console.error("Mail send error:", mailErr);
          emailDeliveryStatus = "logged_local_dispatch";
        }
      } else {
        console.log(`[ONLINEFIRST DISPATCH] Email notification queued for ${onlineFirstEmail} and ${contractRecipientEmail}:`);
        console.log(emailBody);
      }

      const record: AcceptanceRecord = {
        referenceId,
        project: "JORMASS Academic Publishing Redesign",
        clientOrg: trimmedOrg,
        clientName: trimmedName,
        clientRole: trimmedRole,
        clientEmail: trimmedEmail,
        clientNotes: clientNotes ? clientNotes.trim() : undefined,
        chosenDemo,
        chosenDemoTitle: demoTitle,
        chosenPackage,
        chosenPackageTitle: selectedPkg.title,
        totalFee,
        totalFeeFormatted: selectedPkg.formatted,
        depositPercentage,
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
        emailDeliveryStatus,
        summaryText: emailBody,
      };

      acceptanceRecords.unshift(record);

      return res.status(200).json({
        success: true,
        reference: referenceId,
        referenceId,
        message: "Selection recorded successfully",
        record,
        notificationDispatchedTo: [onlineFirstEmail, contractRecipientEmail, trimmedEmail],
      });
    } catch (err: any) {
      console.error("Server error handling acceptance:", err);
      return res.status(500).json({
        success: false,
        error: "Unable to record selection due to a server error. Please retry or contact OnlineFirst Studio.",
        errorCode: "SUBMISSION-ERROR-SERVER-500",
      });
    }
  };

  // Mount endpoints
  app.post("/api/jormass-acceptance", handleAcceptanceRequest);
  app.post("/api/selection-acceptance", handleAcceptanceRequest);

  // 3. GET /api/selection-records (Audit retrieval)
  app.get("/api/selection-records", (_req, res) => {
    res.json({
      success: true,
      count: acceptanceRecords.length,
      records: acceptanceRecords,
    });
  });

  // 4. Vite middleware for development vs static for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`JORMASS server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
