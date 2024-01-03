import Link from 'next/link';

const HomePage = () => {
  return (
    <div className='home-page'>
      <h1>Redmine</h1>
      <p>
        Redmine is a flexible project management web application. Written using the Ruby on Rails framework, it is cross-platform and cross-database.
      </p>
      <p>
        Redmine is open source and released under the terms of the{' '}
        <Link href='http://www.gnu.org/licenses/old-licenses/gpl-2.0.html'>GNU General Public License v2</Link> (GPL)
      </p>

      <h3>Features</h3>
      <p>Some of the main features of Redmine are:</p>
      <ul>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineProjects'>
            Multiple Project Support
          </Link>
        </li>
        <li>
          Flexible{' '}
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineRoles'>
            role based access control
          </Link>
        </li>
        <li>
          Flexible{' '}
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineIssues'>
            issue tracking system
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineGantt'>
            Gantt Chart
          </Link>{' '}
          and{' '}
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineCalendar'>
            Calendar
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineNews'>
            News
          </Link>
          ,{' '}
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineDocuments'>
            documents
          </Link>
          &{' '}
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineFiles'>
            files
          </Link>{' '}
          management
        </li>
        <li>Feeds & email notifications</li>
        <li>
          Per project{' '}
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineWikis'>
            Wiki
          </Link>
        </li>
        <li>
          Per project{' '}
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineForums'>
            forums
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineTimeTracking'>
            Time tracking
          </Link>
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineCustomFields'>
            Custom fields
          </Link>
          for issues, time-entries, projects, and users
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineRepository'>
            SCM integration
          </Link>{' '}
          (SVN, CVS, Git, Mercurial, and Bazaar)
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineReceivingEmails'>
            Issue creation via email
          </Link>
        </li>
        <li>Multiple{' '}
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineLDAP'>
            LDAP authentication
          </Link>
          support
        </li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineRegister'>
            User self-registration
          </Link>{' '}
          support
        </li>
        <li>Multilanguage support</li>
        <li>
          <Link href='https://www.redmine.org/projects/redmine/wiki/RedmineInstall#Supported-database-back-ends'>
            Multiple databases
          </Link>
          support
        </li>
      </ul>

      <p>
        Read more about{' '}
        <Link href='https://www.redmine.org/projects/redmine/wiki/Features'>
          Redmine features.
        </Link>
      </p>
    </div>
  );
};

export default HomePage;
