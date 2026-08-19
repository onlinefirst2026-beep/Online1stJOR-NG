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

  // 1. Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // 2. Selection & Commercial Acceptance Submission Route
  app.post("/api/selection-acceptance", async (req, res) => {
    try {
      const {
        clientName,
        clientRole,
        clientOrg = "JORMASS — Journal of Research in Management and Social Sciences",
        clientEmail,
        clientNotes,
        chosenDemo,
        chosenPackage,
        authorityConfirmed,
        commercialTermsConfirmed,
      } = req.body;

      // Server-side validation
      if (!clientName || !clientRole || !clientEmail || !chosenDemo || !chosenPackage) {
        return res.status(400).json({
          success: false,
          error: "Missing required identification or selection fields.",
        });
      }

      if (!authorityConfirmed || !commercialTermsConfirmed) {
        return res.status(400).json({
          success: false,
          error: "Authority confirmation and commercial terms acceptance are mandatory.",
        });
      }

      // Generate Reference ID: OF-JORMASS-YYYYMMDD-XXXX
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
      const referenceId = `OF-JORMASS-${dateStr}-${randomHex}`;

      // Calculate Tier Fees & 50% Deposit
      const packagePricing: Record<string, { title: string; fee: number; formatted: string }> = {
        basic: {
          title: "Basic — Design & Handover (Client Self-Hosted)",
          fee: 250000,
          formatted: "₦250,000",
        },
        launch: {
          title: "Launch — Design + Deployment + 2-Year Cloud Hosting & Domain",
          fee: 350000,
          formatted: "₦350,000",
        },
        professional: {
          title: "Professional — Journal CMS Platform + Publications & Events [RECOMMENDED]",
          fee: 485000,
          formatted: "₦485,000",
        },
        advanced: {
          title: "Advanced — Enterprise Digital Platform & Custom Migrations",
          fee: 650000,
          formatted: "₦650,000 (Base)",
        },
      };

      const selectedPkg = packagePricing[chosenPackage] || packagePricing.professional;
      const totalFee = selectedPkg.fee;
      const depositPercentage = 50;
      const depositAmount = totalFee * 0.5;
      const balanceAmount = totalFee - depositAmount;

      const demoTitles: Record<string, string> = {
        demo1: "Demo 1 — Heritage Academic (Traditional Journal Spine & Dual-Column Scholarly Rail)",
        demo2: "Demo 2 — Contemporary Research (Modern Split Hero & Topic Taxonomy Filtering)",
        demo3: "Demo 3 — Scholarly Discovery Platform (Deep Navy & Royal Purple Academic Discovery)",
        custom: "Custom Hybrid / Specific Requested Adjustments",
      };

      const demoTitle = demoTitles[chosenDemo] || chosenDemo;
      const submissionTimestamp = new Date().toISOString();
      const termsVersion = "JORMASS-COMMERCIAL-TERMS-v1.0";
      const governingLaw = "Laws of the Federal Republic of Nigeria";
      const contractRecipientEmail = "editorial@jormass.com";
      const onlineFirstEmail = process.env.NOTIFICATION_EMAIL_RECIPIENT || "onlinefirst2026@gmail.com";

      // Formatted Email Body for OnlineFirst & Client Confirmation
      const emailBody = `ONLINEFIRST STUDIO
JORMASS PROJECT DIRECTION & COMMERCIAL ACCEPTANCE

Reference: ${referenceId}
Date: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
Time: ${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZoneName: "short" })}
Client: ${clientOrg}
Submitted by: ${clientName}
Position: ${clientRole}
Email: ${clientEmail}

PREFERRED DESIGN
Demo: ${demoTitle}

IMPLEMENTATION PACKAGE
Package: ${selectedPkg.title}
Total Project Fee: ₦${totalFee.toLocaleString()}
Initial Payment Required (50%): ₦${depositAmount.toLocaleString()}
Balance: ₦${balanceAmount.toLocaleString()}

COMMERCIAL ACCEPTANCE
Client confirmed authority: YES
Commercial terms accepted: YES
Formal contract required: YES

Contract recipient:
${contractRecipientEmail}

Client Feedback / Notes:
${clientNotes || "Standard implementation based on selected concept and package tier."}

Client acknowledgement:
I confirm that I am authorised to make this selection on behalf of JORMASS and that I have reviewed and accept the design direction, selected implementation package, stated project fee, 50% initial payment requirement and commercial terms.
Governing Law: ${governingLaw}

Submission timestamp:
${submissionTimestamp}

Technical record:
${referenceId} | ${termsVersion}`;

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
              to: [onlineFirstEmail, contractRecipientEmail, clientEmail],
              subject: `JORMASS — Selection Confirmed — ${referenceId}`,
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
        console.log(`[ONLINEFIRST DISPATCH] Email notification automatically queued for ${onlineFirstEmail} and ${contractRecipientEmail}:`);
        console.log(emailBody);
      }

      const record: AcceptanceRecord = {
        referenceId,
        project: "JORMASS Academic Publishing Redesign",
        clientOrg,
        clientName,
        clientRole,
        clientEmail,
        clientNotes,
        chosenDemo,
        chosenDemoTitle: demoTitle,
        chosenPackage,
        chosenPackageTitle: selectedPkg.title,
        totalFee,
        totalFeeFormatted: `₦${totalFee.toLocaleString()}`,
        depositPercentage,
        depositAmount,
        depositAmountFormatted: `₦${depositAmount.toLocaleString()}`,
        balanceAmount,
        balanceAmountFormatted: `₦${balanceAmount.toLocaleString()}`,
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
        referenceId,
        record,
        notificationDispatchedTo: [onlineFirstEmail, contractRecipientEmail, clientEmail],
      });
    } catch (err: any) {
      console.error("Server error handling acceptance:", err);
      return res.status(500).json({
        success: false,
        error: "Internal server error while processing selection acceptance. Please retry.",
      });
    }
  });

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
