Our SUT is related with Review collections called Loox, 
Here are its main functionalities.
It has an admi n panel where reviews are received via email by the people which purchased a product from the page. 
Reviews can contain photos and videos submitted by the customers. 
If a customer leaves a review, they receive a discount, depending if they have sumbited only text, or text + photo or text+photo+video. 
There is also auto publish adjustments, depending on the settings e.g. 4 starts and + plus review is receive - auto publish it. 
Themes can also be applied. 
Review links and QR codes are also generated to invite a customer to leave a review. 
Product groups can be also created, grouping identical products. 
General settings allows to make adjustments like changing a logo, uploading a new one, changing colors. 
Demo stores can be created, where all the reviews left by customers are stored. Functionalitites are, ratings, multiple photo uploads and also videos. Testimonial widget is also available.
Loox is an app inside Shopify, it can be managed by Shopify,  Activating Loox from shopify, a user is offered to select between 3 plans, that enable different functionalities.  After selecting a plan options for adjust the plan like Discounts, themes are shown for the user to set up. 
Set uo finished by enabling the Loox core script and the Loox apps appear where the setup can be completed. 
We are not testing Shopify in anyway we only care about the Loox App. Import and collect reviews are out of scope at the setup stage. 
Seinding emails for review request, the actual email field can take up to 100 emails at once. 
The system initials starts blank without any data such as reviews. 
Referals are also out of scope. 
Basically we only need to test the actual Loox app inside the shopify. Yet again, shopify functionalitites are out of scope. 
Integrations is out of scope. 
Email designer functionality is customizing the emails sent to the customers. 
Localization offers changing the Primary language or use Multilingual support and Auto-translate review option, which basically auto translates the review left for customers accross different countries. 
External domains is out of scope. 
Plans option can be used to verify the current plan, downgrade it or upgrade it. 
Changing themes from shopify is also available, we are not interested in this functionality, we care about how our app will react upon changing a theme. 
Payment process is in QA environment card with number : 1 
Security code 123, year 12 2008 and any name can be used to simulate a purchase. 
This connects to Loox by clicking on Settings -> Orders to check if the order is there, using the orders functionality from Shopify itself is out of scope.

## SUT SCOPE DEFINITION

### IN SCOPE - Reviews Functionality
**Main Scope: Reviews**
- Manage Reviews / Store Reviews
- Reviews Widgets
- Email Editors
- Manual Request
- Review Form & Custom Questions
- Discounts
- Publishing Reviews
- Preview Link & QR Code
- Product Groups
- Reviews Settings

### IN SCOPE - Settings Functionality
**Settings Scope:**
- Branding
- Email Settings
- Add Loox To Your Theme
- Manual Request
- Orders
- Localization
- Preview Link & QR Code
- Loox Plan - Upgrade & Downgrade

### OUT OF SCOPE
**Explicitly Out of Scope:**
- IMPORT REVIEWS
- INTEGRATIONS
- REFERRALS
- UPSELL
- SEO
- Ext DOMAINS 
