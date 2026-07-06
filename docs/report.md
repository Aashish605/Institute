Comprehensive QA Audit Report — Mirror Academy
Project: Mirror Academy — Full-Stack Educational Platform
Components Audited: Public frontend (React 19/Vite 6), Admin panel (React 19/Vite 6), Backend (Express 5/Sequelize/PostgreSQL)
Date: 2026-07-06
Status: Live testing performed — backend running on :5001, frontend on :5173, admin on :5174

CRITICAL Issues
1. Profile Update Button Never Shows "Already Updated"
Severity: Critical
Files: frontend/src/Profile/Profile.jsx:16, backend/Controller/Auth.controller.js:18-21, backend/Model/User.model.js

Description:
The Profile page decides whether the user has completed their update by checking logIn?.number && logIn?.class. However, the User Sequelize model only defines these fields: googleId, displayName, email, photo, contact, isAdmin. There are no number or class columns anywhere.

Because both fields are always undefined, updated is always false. The "Already Updated" disabled button state never appears, and users can submit the name change repeatedly.

Reproduction Steps:

Log in → visit /profile
Enter a new name → click "Update Profile" → see success alert
Refresh the page
The button still reads "Update Profile" (should read "Already Updated")
Open Redux DevTools → inspect state.auth.user → confirm no number or class fields
Root Cause: Frontend/backend schema drift. The update endpoint only writes displayName (and optionally contact), but the UI gate references number and class which don't exist.

2. API BaseURL Resolves to Empty String in Local Development
Severity: Critical
Files: frontend/src/config/site.js:22, admin/src/config/api.js:4

Description:
Both clients configure:

baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://institute-xi.vercel.app' : ''),
VITE_API_URL is not set in either frontend/.env or admin/.env. In non-production mode, baseURL resolves to '', so Axios issues same-origin requests against the frontend origin (e.g., http://localhost:5173/api/...). This is only rescued by the Vite proxy block. If the proxy is removed, SSR is used, or tests run outside the dev server, every API call 404s.

Reproduction Steps:

In frontend/vite.config.js, comment out the proxy block
Run npm run dev in frontend/
Open DevTools → Network → visit homepage
Observe http://localhost:5173/api/course returns 404
Check Axios config in console: baseURL is ""
Root Cause: Missing VITE_API_URL=http://localhost:5001 in both .env files.

3. Unauthenticated Users Can Submit Fake Payment Receipts
Severity: Critical
File: backend/Routes/PaymentReceipt.route.js:7, backend/Controller/PaymentReceipt.controller.js:3-24

Description:
The POST /api/payment/receipt endpoint has no authentication middleware. Any unauthenticated request can submit a payment receipt. The frontend protects the /enroll page with RequireAuth, but the API itself trusts any caller.

router.post('/receipt', submitReceipt); // ← no isAdmin / auth check
The controller sets userId: req.user?.id || null, so a malicious actor can inject bogus receipts with userId: null, flooding the admin panel with unverifiable records.

Reproduction Steps:

Stop the frontend, ensure backend is live
curl -X POST http://localhost:5001/api/payment/receipt \ -H "Content-Type: application/json" \ -d '{"receipt":"fake.jpg","course":"Any Course","userName":"Hacker","userEmail":"hacker@test.com"}'
Response: 200 OK with payment record created
Visit /payments in admin (after auth) → the bogus receipt appears
Root Cause: Missing auth guard on a public-facing write endpoint.

MAJOR Issues
4. Enroll Page Error Message Contradicts Actual Validation
Severity: Major
File: frontend/src/Course/Enroll.jsx:61, 105

Description:
The submit handler early-returns with:

"Transaction reference and receipt are required."
when receipt is missing. The message says both are required, but:

reference is not sent to the backend as required by the controller
The backend only enforces receipt, course, userName, userEmail
A user who fills the receipt but leaves the reference blank sees a misleading message implying both are mandatory.

Reproduction Steps:

Log in → go to /course/.../enroll
Upload a receipt image, leave reference blank
Click submit
Observe misleading error text about "Transaction reference and receipt"
5. Enroll Page Payment Instruction Typo
Severity: Major
File: frontend/src/Course/Enroll.jsx:105

Description:

<li>Upload your receipt image and click on the "Submit Payment for Verification" butto</li>
"butto" is displayed to end users.

Reproduction Steps:

Log in → visit any /course/:model/enroll
Scroll to left card "Payment Instruction"
Observe truncated word: "butto"
6. Notice Detail Page Shows Wrong Error Message
Severity: Major
File: frontend/src/Notice/NoticeModel.jsx:26

Description:

return <div className="text-center py-20 text-xl text-red-500">Result not found.</div>;
The Notice detail page says "Result not found." which is copy/pasted from the Mock detail page. Users reading a notice see exam-result wording.

Reproduction Steps:

Navigate to /notice/999999
Observe: "Result not found."
7. Contact Form Submit Error Message Typo
Severity: Major
File: frontend/src/Contact/Contact.jsx:43

Description:

notifyError("Error druing Submitting")
"druing" is shown in the error toast.

Reproduction Steps:

Open DevTools → toggle Network to Offline
Go to /contact → submit the form
Observe toast: "Error druing Submitting"
8. Hero Subtitle Typo in Global Site Config
Severity: Major
File: frontend/src/config/site.js:29

Description:

subtitle:
  "Join Mirror where expert-led teaching, data-driven performance a nalytics, and a mentorship-driven community..."
There is a stray space: "a nalytics" instead of "analytics". This is rendered on the homepage hero for every visitor.

Reproduction Steps:

Visit homepage
Observe hero subtitle: "data-driven performance a nalytics"
MINOR Issues
9. Nav Contact Icon Typo Classes
Severity: Minor
File: frontend/src/Components/Nav.jsx:215

Description:

className="outline-1 px-2 py-2 rounded-[50%] bject-center object-cover l w-[50px] ..."
bject-center → missing o → object-center
l w-[50px] → stray l
Impact: The icon image lacks object-fit: center and has an unrecognized class.

Reproduction Steps:

Clamp viewport to mobile width
Inspect the contact/avatar image in DevTools
Observe invalid CSS class bject-center and stray l
10. Footer Static Text Wrapped in NavLink
Severity: Minor
File: frontend/src/Components/Footer.jsx:55

Description:

<NavLink className="w-fit">{content.footer_rights || 'All Right Reserved'}</NavLink>
<NavLink> is a navigational component. "All Right Reserved" is not a link. This renders as an <a href="..."> with empty/non-functional href and applies unnecessary hover styles.

Reproduction Steps:

Inspect footer text "All Right Reserved"
Observe it is wrapped in an anchor tag
11. Swiper Navigation CSS Missing content: ''
Severity: Minor
File: frontend/src/Home/style.css:23-25

Description:

.swiper-button-prev::after {
    background-image: url(person.png);
}
The ::after pseudo-element has no content: '', so the background image is never painted even if Swiper navigation is re-enabled.

12. Branding Inconsistency — "PI Academy" / "Pi Academy"
Severity: Minor
Files: Multiple

Description:
The platform was rebranded to "Mirror" but legacy copies remain:

site.js line 144: Contact subtitle mentions "PI Academy"
About.jsx line 82: "PI contributes towards..."
Home.jsx line 175: testimonial says "Pi Academy"
About.jsx line 78: "Regular QAD, doubt clearing sessions" (should be "Q&A")
Reproduction Steps:

Visit /contact → hero text: "more about PI Academy"
Visit /about → see "PI contributes towards..."
Visit / → testimonial: "Pi Academy" and "for the part three years" (should be "past")
13. Empty DOM Element in Contact Page
Severity: Minor
File: frontend/src/Contact/Contact.jsx:98-100

Description:

<div>

</div>
Dead markup between the phone and email info blocks.

14. All Admin List Pages Swallow API Errors Silently
Severity: Minor
Files: admin/src/pages/CourseList.jsx:11, NoticeList.jsx:10, MockList.jsx:10, Contacts.jsx:8, ContentEditor.jsx:85

Description:
Every admin page uses empty catch blocks:

api.get('/api/course').then(res => setCourses(res.data)).catch(() => {})
When the backend is down, the table renders empty with no error message and no retry button.

Reproduction Steps:

Stop the backend server
Open /courses, /notices, /mocks, /contacts, or /content in admin
Observe: blank table with no indication of failure
15. Mock & Notice Public Pages Have No Error State
Severity: Minor
Files: frontend/src/Mock/Mock.jsx:13-17, frontend/src/Notice/Notice.jsx:13-17

Description:
Both pages call api.get() inside getdata() with no try/catch. A network failure produces an unhandled promise rejection and the page stays blank (state remains []).

Reproduction Steps:

DevTools → Network → Offline
Visit /mock or /notice
Observe blank page and UnhandledPromiseRejection in console
16. Backend Mock Delete Controller Returns Count, Not Record
Severity: Minor
File: backend/Controller/Mock.controller.js:46

Description:

const remove = await Mock.destroy({ where: { id: req.body.id } });
return res.json(remove)
destroy() returns the number of rows deleted (e.g., 1), not the deleted entity. The API response is semantically misleading.

17. Contact Form Placeholder Typo
Severity: Minor
File: frontend/src/Contact/Contact.jsx:73

Description:

<textarea placeholder='Descirbe your inquiry' ... />
Should be "Describe your inquiry".

18. Form Labels Are Not Associated With Inputs
Severity: Minor
Files: frontend/src/Contact/Contact.jsx, frontend/src/Course/Enroll.jsx, admin/src/pages/CourseForm.jsx, admin/src/pages/NoticeForm.jsx, admin/src/pages/MockForm.jsx

Description:
Inputs have labels but lack matching id / htmlFor attributes. Screen readers cannot associate labels with controls.

Example:

<label htmlFor="">Full Name</label>
<input required ... {...register("fullName")} />
Impact: Accessibility failure — users of assistive technology cannot identify form fields.

19. REST Convention Violation — DELETE Routes Implemented as POST
Severity: Minor
Files: backend/Routes/Mock.route.js:10, backend/Routes/Notice.route.js:11

Description:

router.post('/delete', isAdmin, deleteMock)
router.post('/delete', isAdmin, deleteNotice)
HTTP DELETE semantics are not used. The admin UI calls these via POST.

20. Admin Panel Missing Deployment Config
Severity: Minor
File: /Users/pawan/apps/Institute/admin/ (missing vercel.json)

Description:
The backend has vercel.json and the frontend has vercel.json, but the admin panel has none. Deploying the admin panel to Vercel without a rewrite/routing config may cause 404s on client-side routes.

21. Console.log Statements Left in Production Code
Severity: Minor
Files: frontend/src/Course/Course.jsx:13, frontend/src/Contact/Contact.jsx:48, backend/Controller/Mock.controller.js:43

Description:
Unnecessary console.log calls that leak operation details in production builds:

console.log(res.data) in Course list
console.log(errors) in Contact form on every render
console.log(req.body.id) in mock delete
22. index.html Body Has Unused CSS Class
Severity: Minor
File: frontend/index.html:10

Description:

<body class="font">
The font class is not defined in any stylesheet.

23. Dynamic Swiper Loop Prop Receives String Instead of Boolean
Severity: Minor
File: frontend/src/Home/Home.jsx:162

Description:

<Swiper className="mySwiper my-6 "
    loop={'true'}  <!-- string 'true' instead of boolean true -->
    ...
>
Swiper expects a boolean for loop. The string 'true' may prevent infinite looping from activating.

24. Ads Section Title Contains Typo
Severity: Minor
File: frontend/src/config/site.js:60

Description:

title: "Run your Ad's here!"
Should be "Run your Ads here!" (apostrophe in "Ad's" is incorrect).

25. Course List Uses Array Index as React Key
Severity: Minor
File: frontend/src/Course/Course.jsx:35, frontend/src/Home/Home.jsx:92

Description:

{course.map((c, i) => (
    <div key={i} ...>
Using the array index as a key causes unnecessary re-renders and state bugs if the course list is ever reordered or filtered.

Recommendation: Use c.id as the key.

Verified Working (No Issues Found)
Backend API: All GET endpoints (/api/course, /api/mock/get, /api/notice/get, /api/content) return correct JSON with expected structure
Pagination: Both Mock and Notice pagination endpoints return { rows, count, page, totalPages } correctly
Protected Routes: Admin mutating endpoints (POST /api/course, PUT /api/course/:id, DELETE /api/mock/delete, PATCH /api/payment/receipt/:id) all return 401 for unauthenticated requests
CORS: Forbidden origins are properly blocked; allowed origins (localhost:5173, localhost:5174, production domains) pass
Frontend Proxy: Vite dev server proxies /api and /auth to localhost:5001 correctly
Builds: Both frontend and admin build successfully without compile errors
Contact Form: Submissions are persisted to the database and returned with 201-equivalent payload
Summary
Severity	Count	Key Themes
Critical	3	Schema mismatch breaking UI, proxy-dependent API baseURL, unauthenticated payment receipt injection
Major	5	Misleading UI copy, wrong error message on Notice page, invalid Swiper loop type, swallowed API errors, unhandled promise rejections
Minor	17	Typos, accessibility gaps, CSS class errors, branding inconsistencies, React key anti-patterns, missing deployment config
Top Recommendations:

Fix User model schema — add number/class or remove those checks from Profile.jsx
Add VITE_API_URL=http://localhost:5001 to both frontend/.env and admin/.env
Add auth middleware to POST /api/payment/receipt
Fix all typos — "druing", "butto", "a nalytics", "QAD", "part three years"
Replace silent catch blocks with error toasts/UI states in all admin list pages
Add error states to Mock.jsx and Notice.jsx fetch calls
