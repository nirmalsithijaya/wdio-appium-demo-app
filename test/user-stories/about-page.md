# User Story: Verify the About Page

**As a** user of the MyRN Demo App,
**I want to** access the About page from the side menu,
**So that** I can view application information such as the version, author, and relevant links.

---

## Acceptance Criteria

**TC-038 — Navigate to the About page**
- Given the app is on the Catalog screen
- When the user opens the side menu and taps "About"
- Then the About screen is displayed

**TC-039 — About page displays app version**
- Given the user is on the About screen
- Then a version number is visible (e.g. "Version 1.x.x")

**TC-040 — About page displays app name/title**
- Given the user is on the About screen
- Then the app name or title is visible on the screen

**TC-041 — About page displays copyright/author info**
- Given the user is on the About screen
- Then copyright or author information is displayed

**TC-042 — Navigate back from About page**
- Given the user is on the About screen
- When the user taps the back button
- Then the app returns to the Catalog screen

---

## Notes
- No login required — the About page should be accessible to all users
- The side menu "About" option should appear regardless of login state
