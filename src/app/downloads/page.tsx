import Link from 'next/link';

function Download() {
  return (
    <>
      <h3 className="text-2xl font-bold mb-4">Download</h3>
      <h5 className="text-lg font-bold mb-2">Latest releases</h5>
      <p>Redmine releases are available in either .tar.gz or .zip format:</p>
      <div className='table-responsive'>
        <table className='table-auto border-collapse border border-gray-800 w-full'>
          <thead>
            <tr>
              <th className='border border-gray-800 p-2'>Version</th>
              <th className='border border-gray-800 p-2'>Release Date</th>
              <th className='border border-gray-800 p-2'>Download Links</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border border-gray-800 p-2'>redmine-5.0.7</td>
              <td className='border border-gray-800 p-2'>2023-11-27</td>
              <td className='border border-gray-800 p-2'>
                <table className='inner-table'>
                  <tr>
                    <td>
                      <Link href='https://www.redmine.org/releases/redmine-5.0.7.tar.gz'>
                        redmine-5.0.7.tar.gz
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link href='https://www.redmine.org/releases/redmine-5.0.7.zip'>
                        redmine-5.0.7.zip
                      </Link>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td className='border border-gray-800 p-2'>redmine-5.1.1</td>
              <td className='border border-gray-800 p-2'>2023-11-27</td>
              <td className='border border-gray-800 p-2'>
                <table className='inner-table'>
                  <tr>
                    <td>
                      <Link href='https://www.redmine.org/releases/redmine-5.1.1.tar.gz'>
                        redmine-5.1.1.tar.gz
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link href='https://www.redmine.org/releases/redmine-5.1.1.zip'>
                        redmine-5.1.1.zip
                      </Link>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h5 className="text-lg font-bold mt-4">Source code</h5>
      <p>
        You can checkout the source code of Redmine from the Subversion repository.
        This is the preferred way to get Redmine if you want to benefit from the
        latest improvements and be able to upgrade easily.
      </p>
      <p>
        The URL of the official Subversion repository is:{' '}
        <Link href='https://svn.redmine.org/redmine'>
          https://svn.redmine.org/redmine
        </Link>
      </p>
      <p>
        Alternatively, you can clone it from the Github mirror maintained by the
        community:{' '}
        <Link href='https://github.com/redmine/redmine'>
          https://github.com/redmine/redmine
        </Link>
      </p>
    </>
  );
}

export default Download;
