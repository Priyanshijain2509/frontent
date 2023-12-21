import Link from 'next/link';

const HelpPage = () => {
  return (
    <div className='help-page'>
      <h1>Redmine guide</h1>
      <br />
      <h3>Installation guide</h3>
      <ul>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineInstall'>
            Installing Redmine
          </Link>
        </li>
        <ul>
          <li>
            <Link href='https://www.redmine.org/projects/redmine/wiki/EmailConfiguration'>
              Email configuration
            </Link>
          </li>
        </ul>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineUpgrade'>
            Upgrading an existing installation
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineMigrate'>
            Migrating from other systems
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineBackupRestore'>
            Backing up and restoring Redmine
          </Link>
        </li>
      </ul>
      <h3>Administrator guide</h3>
      <p>
        All following configuration settings can only be accessed and controlled by administrators, i.e. by users that have got the administrator flag checked.
      </p>

      <h3>Common configuration</h3>
      <ul>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineProjects'>
            Managing projects
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineUsers'>
            Managing users
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineGroups'>
            Managing groups
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineRoles'>
            Roles and permissions
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineIssueTrackingSetup'>
            Issue tracking system
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineCustomFields'>
            Custom fields
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineEnumerations'>
            Enumerations
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineSettings'>
            Application settings
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineAdminInformation'>
            Administration information
          </Link>
        </li>
      </ul>

      <h3>Advanced configuration</h3>
      <ul>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineRepositories'>
            Configuring repositories
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineReceivingEmails'>
            Receiving emails
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineReminderEmails'>
            Sending reminder emails
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineLDAP'>
            LDAP Authentication
          </Link>
        </li>
      </ul>

      <h3>Maintenance operations</h3>
      <ul>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineRake'>
            Rake tasks
          </Link>
        </li>
      </ul>

      <h3>User guide</h3>
      <ul>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/Getting_Started'>
            Getting Started
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineAccounts'>
            User accounts
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineLogin'>
            Login
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineRegister'>
            Register
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineSearch'>
            Search
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineMyPage'>
            My page
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineProjectOverview'>
            Project overview
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineProjectActivity'>
            Project activity
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineIssues'>
            Issue tracking
          </Link>
        </li>
        <ul>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineIssueList'>
            Issue list
          </Link>
          <ul>
            <li>
              <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineIssueSummary'>
                Issue summary
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineRoadmap'>
            Roadmap
          </Link>
          <ul>
            <li>
              <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineVersion'>
                Version overview
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineTimeTracking'>
            Time tracking
          </Link>
          <ul>
            <li>
              <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineTimelogDetails'>
                Spent-time details
              </Link>
            </li>
            <li>
              <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineTimelogReport'>
                Spent-time report
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineGantt'>
            Gantt
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineCalendar'>
            Calendar
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineNews'>
            News
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineDocuments'>
            Documents
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineFiles'>
            Files
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineForums'>
            Forums
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineWikis'>
            Wikis
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineRepository'>
            Repository
          </Link>
        </li>
        <ul>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineRepositoryStatistics'>
            Statistics
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineProjectSettings'>
            Project settings
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineAttachedFiles'>
            Files attached to Redmine resources
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineTextFormatting'>
            Text formatting in Redmine
          </Link>
          <ul>
            <li>
              <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineTextFormattingTextile'>
                Textile
              </Link>
            </li>
            <li>
              <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineTextFormattingMarkdown'>
                Markdown
              </Link>
            </li>
            <li>
              <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineCodeHighlightingLanguages'>
                Code highlighting supported languages
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineKeyboardNavigation'>
            Keyboard Navigation
          </Link>
        </li>
      </ul>
    </ul>
  </ul>

      <h1>Translations of the Redmine guide</h1>
      <p>
        Note that the following translations may not be up to date. Please refer to the original English documentation if needed.
      </p>
      <ul>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/FrGuide'>
            French
          </Link>
        </li>
        <li>
          <Link href='http://guide.redmine.jp/'>
            Japanese
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RusGuide'>
            Russian
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HelpPage;
