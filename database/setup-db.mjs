import fs from 'node:fs';
import path from 'node:path';
import { neon } from '@neondatabase/serverless';

const envPath = path.resolve(process.cwd(), '.env.local');
const envText = fs.readFileSync(envPath, 'utf8');
for (const line of envText.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
  const [key, ...rest] = trimmed.split('=');
  process.env[key] = rest.join('=');
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is missing from .env.local');
}

const sql = neon(databaseUrl);

async function ensureDatabase() {
  await sql`CREATE TABLE IF NOT EXISTS meetings (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    meeting_type VARCHAR(20) NOT NULL CHECK (meeting_type IN ('testimony','regular','stake','general','special')),
    presiding VARCHAR(255) NOT NULL,
    conducting VARCHAR(255) NOT NULL,
    announcements TEXT[] DEFAULT '{}',
    opening_hymn JSONB NOT NULL,
    opening_prayer VARCHAR(255) NOT NULL,
    ward_business JSONB DEFAULT '[]',
    stake_business BOOLEAN DEFAULT false,
    sacrament_hymn JSONB NOT NULL,
    speakers JSONB DEFAULT '[]',
    closing_hymn JSONB NOT NULL,
    closing_prayer VARCHAR(255) NOT NULL
  );`;

  const existing = await sql`SELECT COUNT(*)::int AS count FROM meetings`;
  if (Number(existing[0].count) > 0) {
    console.log(`Database already contains ${existing[0].count} meetings.`);
  }

  await sql`
    INSERT INTO meetings (
      date, meeting_type, presiding, conducting, announcements,
      opening_hymn, opening_prayer, ward_business, stake_business,
      sacrament_hymn, speakers, closing_hymn, closing_prayer
    ) VALUES
      ('2026-01-04','testimony','Bishop Thompson','Brother Nakamura',ARRAY[]::TEXT[], '{"number":134,"title":"I Believe in Christ"}','Sister Park','[]',false,'{"number":175,"title":"God, Our Father, Hear Us Pray"}','[]','{"number":219,"title":"Because I Have Been Given Much"}','Brother Alvarez'),
      ('2026-01-11','regular','Bishop Thompson','Brother Nakamura',ARRAY['Ward temple night: Jan 30'], '{"number":2,"title":"The Spirit of God"}','Sister Ramirez','[{"description":"Sustaining of new Sunday School president"}]',true,'{"number":169,"title":"In Remembrance of Thy Suffering"}','[{"name":"Sister Chen","topic":"The Sacrament","type":"speaker"},{"name":"Brother Osei","topic":"Covenant Keeping","type":"speaker"}]','{"number":31,"title":"O God, Our Help in Ages Past"}','Brother Lewis'),
      ('2026-01-18','regular','Bishop Thompson','Sister Torres',ARRAY['Ministering interviews this week'], '{"number":85,"title":"How Firm a Foundation"}','Brother Kim','[{"description":"Release - Sister Martinez - Primary Teacher"},{"description":"Sustain - Sister Agbavor - Primary Teacher"},{"description":"Sustain - Sister Mukiwa - RS 2nd Counselor"}]',false,'{"number":173,"title":"While of These Emblems We Partake"}','[{"name":"Sister Nakamura","topic":"Personal Revelation","type":"speaker"},{"name":"Youth Choir","topic":"","type":"musical-number"},{"name":"Brother Santos","topic":"Temple Covenants","type":"speaker"}]','{"number":226,"title":"Improve the Shining Moments"}','Sister Jensen'),
      ('2026-01-25','stake','President Gimenez','Brother Alvarez',ARRAY['Stake leadership training'], '{"number":114,"title":"God Be with You Till We Meet Again"}','Sister Lopez','[{"description":"Stake business and sustaining"}]',true,'{"number":160,"title":"As I Have Loved You"}','[{"name":"Brother Castillo","topic":"How to receive revelation","type":"speaker"}]','{"number":188,"title":"At Calvary"}','Sister Gomez'),
      ('2026-02-01','special','Bishop Thompson','Brother Lee',ARRAY['Ward youth activity this Friday'], '{"number":140,"title":"Come, Follow Me"}','Brother Davis','[]',false,'{"number":198,"title":"An Angel from on High"}','[{"name":"Sister Nguyen","topic":"Faith in Christ","type":"speaker"}]','{"number":142,"title":"Jesus of Nazareth"}','Sister Morris'),
      ('2026-02-08','regular','Bishop Thompson','Sister Nguyen',ARRAY['Fast Sunday next week'], '{"number":120,"title":"I Know That My Redeemer Lives"}','Brother Clark','[{"description":"Sustain - Brother Adams - Young Men president"}]',false,'{"number":179,"title":"Great Is the Lord"}','[{"name":"Brother King","topic":"Service and charity","type":"speaker"},{"name":"Ward Choir","topic":"Come Unto Christ","type":"musical-number"}]','{"number":88,"title":"How Great Thou Art"}','Brother Stevens'),
      ('2026-02-15','testimony','Bishop Thompson','Brother Nakamura',ARRAY['Temple recommend interviews'], '{"number":66,"title":"Faith of Our Fathers"}','Sister Hill','[]',false,'{"number":188,"title":"At Calvary"}','[{"name":"Brother Hale","topic":"Testimony of the Book of Mormon","type":"speaker"},{"name":"Sister Brooks","topic":"Prayer and repentance","type":"speaker"}]','{"number":201,"title":"I Stand All Amazed"}','Brother Ortiz'),
      ('2026-02-22','general','Elder Martinez','Brother Alvarez',ARRAY['Stake temple day Saturday'], '{"number":164,"title":"Behold Thy Sons and Daughters"}','Sister Lopez','[{"description":"Sustain - Sister Crossley - Primary president"}]',true,'{"number":170,"title":"At the Crossroads of Life"}','[{"name":"Brother Watson","topic":"Missionary service","type":"speaker"}]','{"number":220,"title":"Lord, I Would Follow Thee"}','Sister Gomez'),
      ('2026-03-01','regular','Bishop Thompson','Sister Torres',ARRAY['Ward cleanup service after church'], '{"number":43,"title":"O Thou Rock of Our Salvation"}','Brother Hall','[{"description":"Sustain - Sister Hayes - Relief Society president"}]',false,'{"number":198,"title":"An Angel from on High"}','[{"name":"Brother Rios","topic":"Faith during trials","type":"speaker"},{"name":"Sister Price","topic":"Ministering with love","type":"speaker"}]','{"number":130,"title":"When Faith Endures"}','Sister Reed'),
      ('2026-03-08','testimony','Bishop Thompson','Brother Nakamura',ARRAY['YSA fireside next week'], '{"number":147,"title":"I Will Follow God’s Plan"}','Sister Green','[]',false,'{"number":181,"title":"Jesus, Once of Humble Birth"}','[{"name":"Brother Joseph","topic":"Testimony of Jesus Christ","type":"speaker"},{"name":"Sister Bell","topic":"The power of prayer","type":"speaker"}]','{"number":244,"title":"Sweet Is the Work"}','Brother Nguyen'),
      ('2026-03-15','regular','Bishop Thompson','Brother Lee',ARRAY['Home teaching report due'], '{"number":124,"title":"The Lord Is My Light"}','Sister Owens','[{"description":"Release - Brother Morris - Seminary teacher"}]',false,'{"number":193,"title":"I Feel My Savior’s Love"}','[{"name":"Sister Moss","topic":"Trusting the Lord","type":"speaker"}]','{"number":216,"title":"Hark, All Ye Nations"}','Brother Mills'),
      ('2026-03-22','stake','President Gimenez','Brother Alvarez',ARRAY['Stake conference this weekend'], '{"number":7,"title":"The Spirit of God"}','Brother Davis','[{"description":"Stake business and reports"}]',true,'{"number":192,"title":"Be Still, My Soul"}','[{"name":"President Vale","topic":"Strengthening the home","type":"speaker"}]','{"number":116,"title":"Lead, Kindly Light"}','Sister James'),
      ('2026-03-29','special','Bishop Thompson','Sister Nguyen',ARRAY['Ward picnic next Saturday'], '{"number":136,"title":"Let Us All Press On"}','Brother King','[]',false,'{"number":170,"title":"At the Crossroads of Life"}','[{"name":"Brother Howard","topic":"The joy of discipleship","type":"speaker"}]','{"number":183,"title":"I Know My Father Lives"}','Sister Cohen'),
      ('2026-04-05','regular','Bishop Thompson','Brother Nakamura',ARRAY['Primary program rehearsal'], '{"number":96,"title":"I Need Thee Every Hour"}','Brother Ross','[{"description":"Sustain - Sister Tyler - Young Women president"}]',false,'{"number":203,"title":"This Is My Father’s World"}','[{"name":"Sister Ford","topic":"Gratitude and service","type":"speaker"}]','{"number":86,"title":"How Great Thou Art"}','Brother Ford'),
      ('2026-04-12','testimony','Bishop Thompson','Sister Torres',ARRAY['Fast offering donations welcome'], '{"number":58,"title":"Come, Come, Ye Saints"}','Brother Wood','[]',false,'{"number":157,"title":"In Fasting We Approach Thee"}','[{"name":"Brother Moore","topic":"A testimony of the restored gospel","type":"speaker"},{"name":"Sister Hill","topic":"Repentance and grace","type":"speaker"}]','{"number":211,"title":"Let the Holy Spirit Guide"}','Sister Payne'),
      ('2026-04-19','regular','Bishop Thompson','Brother Lee',ARRAY['Temple recommend interview morning'], '{"number":14,"title":"Now Let Us Rejoice"}','Sister Logan','[{"description":"Sustain - Brother Clark - Elder’s quorum president"}]',false,'{"number":174,"title":"I Stand All Amazed"}','[{"name":"Brother Shaw","topic":"The blessings of obedience","type":"speaker"},{"name":"Ward Choir","topic":"Beautiful Savior","type":"musical-number"}]','{"number":143,"title":"Jesus of Nazareth"}','Brother Kerr')
    ON CONFLICT (date) DO NOTHING;`;

  const countResult = await sql`SELECT COUNT(*)::int AS count FROM meetings`;
  console.log(`Database ready: ${countResult[0].count} meetings seeded.`);
}

ensureDatabase().catch((error) => {
  console.error('DATABASE_SETUP_ERROR');
  console.error(error.message);
  process.exit(1);
});
