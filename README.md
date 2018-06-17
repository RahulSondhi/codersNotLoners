# codersNotLoners

## Project Specification
The basic idea behind the on-line dating system is that it will allow customers to use the web to browse/search the contents of your database (at least that part you want the customer to see) and to meet people they would be interested in dating. In particular, the web site should allow users to browse other user profiles and to contact those users they are interested in dating to see if the interest is mutual.

Additionally, the system should allow a user to "like" (as in facebook) another user's profile, and to alert two users if they like each other's profiles. Moreover, your system should support a Rate a Date feature that allows a user to rate a date he/she had with another user, and to make date ratings available for other users to see. Finally, your system should support Referrals, where one user (User A) refers another user (User B) to a third user (User C), so that User C can go on a "blind date" with User B.

# Database Specifications.

## 2 System Users
The users of your system will be the customers (AKA users) that use your system for online dating, customer representatives who provide customer-related services, and the site's manager. You should assume that the computer knowledge of the users is limited (say, that of a typical AOL subscriber), and thus your system must be easy to access and operate.

<H2><A NAME="SECTION00021000000000000000">2.1 Profile Data</A></H2>
<P>
Each user may post one or more user profiles on the web site.  This category
of data should include the following items:
<P>
<UL><OL>
<LI> Profile ID
<LI> Profile Name (optional)
<LI> Age
<LI> Address (city, state)
<LI> M/F
<LI> Physical Characteristics
<LI> Hobbies and other Interests
<LI> Photos (optional)
<LI> Dating Geo-Range (in miles)
<LI> Dating Age Range
<P>
</OL></UL>
<P>
Each user has an ID; see the User Data category below.  A user can specify a
dating range in miles.  For example, a user with a dating range of 25 miles
means that this user is only interested in dating someone who lives within
25 miles of him/her.  Physical characteristics include height, weight, and
hair color.

<H2><A NAME="SECTION00021000000000000000">2.2 Likes Data</A></H2>
<P>
This category of data should include the following items:
<P>
<UL><OL>
<LI> Liker ID
<LI> Likee ID
<LI> Date/Time
<P>
</OL></UL>
<P>
One user profile (the liker) can "like" (as in facebook) another user
profile (the likee).  You should also record the date/time the liker
liked the likee.
<P>
<H2><A NAME="SECTION00021000000000000000">2.3 Date Data</A></H2>
<P>
This category of data should include the following items:
<P>
<UL><OL>
<LI> Date ID
<LI> User 1 ID
<LI> User 2 ID
<LI> Date/Time
<LI> Geo-Location
<LI> Booking Fee
<LI> Customer Representative
<LI> Comments
<LI> User 1's Rating of the date
<LI> User 2's Rating of the date
<P>
</OL></UL>
<P>
A <b>date</b> is between two users of the system (User 1 and User 2),
which takes place on a particular date/time and at a particular
geo-location, in the case of a geo-date.  A date has an associated
booking fee, which is primarily how your company makes money, and an
associated customer representative.  That is, your company charges its
customers every time they go on a date that the company helped to
facilitate.  Moreover, the customer representative associated with the
date is on-call during the date to provide on-the-spot dating advice to
either of the two users on the date.  Either user can post comments
about the date (before, during, or after the date).  They can also
<EM>rate the date</EM> Excellent, Very Good, Good, Fair, or Poor.
<P>
<H2><A NAME="SECTION00021000000000000000">2.4 Referral Data</A></H2>
<P>
This category of data should include the following items:
<P>
<UL><OL>
<LI> User A
<LI> User B
<LI> User C
<LI> Date/Time
<P>
</OL></UL>
<P>
User A refers User B to User C so that User C can go on a "blind date"
with User B.  You should also record the date/time the referral was
made.
<P>
<H2><A NAME="SECTION00023000000000000000">2.5 Customer Data</A></H2>
<P>
The items required for this category include:
<P>
<UL><OL>
<LI> User ID
<LI> Last Name
<LI> First Name
<LI> Address
<LI> City
<LI> State
<LI> Zip Code
<LI> Telephone
<LI> E-mail Address
<LI> Account Number
<LI> Account Creation Date
<LI> Credit Card Number
<LI> Profile Placement Priority
<LI> Rating
<LI> Date/Time last active
<P>
</OL></UL>
<P>
Each customer (AKA user) has an associated User ID, which can be an
arbitrary character string up to 24 characters long.  
A customer may view any number of profiles, go on any number of dates,
and have one or more accounts from which to pay the booking fees
associated with dates.  A customer may also pay for a 
<EM>Profile Placement Priority</EM> (PPP), which helps determine the order 
in which his/her profile will be shown to other users.  There are three
PPPs: Super-User, which costs $100/yr and gives this user's profile
highest priority/visibility; Good-User, which costs $50/yr and provides
mid-level priority; and User-User, which is free and the default.
User-User profiles will be displayed after higher-PPP users, assuming
these higher-PPP users are active.  Let John Smith be a customer.  John
Smith's <EM>rating</EM> is based on the ratings he received on the dates
he went on.
<P>
<H2><A NAME="SECTION00024000000000000000">2.6 Employee Data</A></H2>
<P>
This category of data should include the following:
<P>
<UL><OL>
<LI> Social Security #
<LI> Last Name
<LI> First Name
<LI> Address
<LI> City
<LI> State
<LI> Zip Code
<LI> Telephone
<LI> Start Date
<LI> Hourly Rate
<P>
</OL></UL>
<P>
<H1><A NAME="SECTION00030000000000000000">3 User-Level Transactions</A></H1>
<P>
<A NAME="sectxn">&#160;</A>
A database <EM>transaction</EM> can be viewed as a small program (written in
the DML) that either updates or queries the database.  Transactions that change
the contents of the database must do so in a consistent manner.  Moreover,
transactions should not interfere with one another when running concurrently.
<P>
What follows is a breakdown of the user-level transactions that your database
system should support.  To make sure transactions maintain the integrity of
the database, you must write them using the SQL transaction structuring
capabilities (i.e., <TT>begin transaction</TT>, <TT>commit transaction</TT>,
etc.).
<P>
<H2><A NAME="SECTION00031000000000000000">3.1 Manager-Level Transactions</A></H2>
<P>
The manager should be able to:
<P>
<UL>
<LI> Add, Edit and Delete information for an employee
<LI> Obtain a sales report for a particular month
<LI> Produce a comprehensive listing of all users
<LI> Produce a list of dates by calendar date or by customer name
<LI> Produce a summary listing of revenue generated by dates on a particular
     calendar date or involving a particular customer
<LI> Determine which customer representative generated most total revenue
<LI> Determine which customer generated most total revenue
<LI> Produce a list of most active customers
<LI> Produce a list of all customers who have dated a particular customer
<LI> Produce a list of the highest-rated customers
<LI> Produce a list of the highest-rated calendar dates to have a date on
<P>
</UL><H2><A NAME="SECTION00032000000000000000">3.2 Customer-Representative-Level Transactions</A></H2>
<P>
Customer Representatives should be thought of as date "reservation agents"
and should be able to:
<P>
<UL>
<LI> Record a date
<LI> Add, Edit and Delete information for a customer
<LI> Produce customer mailing lists
<LI> Produce a list of profiles as date suggestions for a given profile
     (based on that profile's past dates)
<P>
</UL><H2><A NAME="SECTION00033000000000000000">3.3 Customer-Level Transactions</A></H2>
<P>
Customers with active profiles should be thought of as online daters and
should be able to easily browse and search for profiles of interest and
set up dates.  In particular, they should be able to:
<P>
<UL>
<LI> Make a date with another customer profile
<LI> Make a geo-date with another customer profile
<LI> Cancel a date
<LI> Comment on a date he/she went on or is going on
<LI> Like another customer's profile
<LI> Refer a Profile B to Profile C so that Profile C can
     go on a "blind date" with Profile B.
</UL>
<P>
While customers will not be permitted to access the database directly,
they should be able to retrieve the following information for each of
their profiles:
<P>
<UL>
<LI> A profile's pending dates
<LI> A profile's past dates
<LI> A profile's favorites list (based on "likes")
<LI> Search for profiles based on physical characteristics, location, etc.
<LI> Most active profiles
<LI> Most highly rated profiles
<LI> Popular geo-date locations
<LI> Personalized date suggestion list
<P>
</UL><H1><A NAME="SECTION00040000000000000000">4 User Access Control</A></H1>
<P>
Your database system should provide controlled access to the data by
distinguishing between the different types of users: manager, customer
representatives, and customers.
<P>
<UL>
<LI> Customer Representatives should not be able to perform manager-level
     transactions; however, they should be able to read employee information,
     except for the hourly rate.
<LI> Customer Representatives should be able to record the receipt of an order
     from a customer.
<LI> A customer should not be allowed access to other customers' account
     information, or to any employee information.
<P>
</UL><H1><A NAME="SECTION00050000000000000000">5 Utilities</A></H1>
<P>
In addition to the transactions described above, the system
should provide facilities for:
<P>
<UL>
<LI> Allowing the manager to add and delete users
<LI> Backing up the database files
<LI> A comprehensive <strong>Help</strong> facility, including a topic-driven
pull-down Help menu
<P>
</UL><H1><A NAME="SECTION00060000000000000000">6 User Interface</A></H1>
<P>
HTML and its successors provide facilities for creating pop-up and pull-down
menus, value lists, input/output forms, labels and customized reports. You
should make use of all of these capabilities, and in the process come up with a
system that caters to users with only limited computer knowledge.  The
information you provide to customers should look professional and inviting.
<P>
