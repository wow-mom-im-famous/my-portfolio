import "./admin.css";
import { isAdmin } from "../../lib/auth";
import { getRows, Row } from "../../lib/items";
import { SECTIONS, SECTION_KEYS, Field } from "../../lib/sections";
import { login, logout, addItem, updateItem, deleteItem, seed } from "./actions";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function FieldInput({ f, value, existing }: { f: Field; value?: string; existing?: boolean }) {
  return (
    <label className={f.long ? "adm-f long" : "adm-f"}>
      <span>{f.label}</span>
      {f.options ? (
        <select name={f.name} defaultValue={existing && f.optional ? (value ?? "") : (value ?? f.options[0].value)}>
          {existing && f.optional && !value && <option value="">(not set)</option>}
          {f.options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : f.long ? (
        <textarea name={f.name} defaultValue={value ?? ""} maxLength={1000} rows={3} />
      ) : (
        <input name={f.name} defaultValue={value ?? ""} maxLength={200} />
      )}
    </label>
  );
}

export default async function Admin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  if (!(await isAdmin())) {
    return (
      <div className="adm" style={{ maxWidth: 420 }}>
        <h1 className="adm-t">Admin</h1>
        <p className="adm-m">Sign in to edit your portfolio.</p>
        <form action={login} className="adm-card">
          <label className="adm-f">
            <span>Password</span>
            <input name="password" type="password" autoComplete="current-password" required autoFocus />
          </label>
          <button className="adm-b" type="submit">Sign in</button>
          {error && <p className="adm-e">Wrong password.</p>}
        </form>
      </div>
    );
  }

  let rows: Row[] = [];
  let dbError = "";
  try {
    rows = await getRows();
  } catch {
    dbError = "Could not reach the database. Check DATABASE_URL and that you ran setup.sql.";
  }

  return (
    <div className="adm">
      <div className="adm-top">
        <div>
          <h1 className="adm-t">Admin</h1>
          <p className="adm-m">Changes appear on your site within a few seconds.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <a className="adm-b alt" href="/">View site</a>
          <form action={logout}><button className="adm-b alt" type="submit">Log out</button></form>
        </div>
      </div>

      {dbError && <p className="adm-e">{dbError}</p>}

      {!dbError && rows.length === 0 && (
        <form action={seed} className="adm-card">
          <p className="adm-m" style={{ marginTop: 0 }}>
            The database is empty, so your site is showing the starter content from
            <code> data/content.ts</code>. Load it in here to start editing it.
          </p>
          <button className="adm-b" type="submit">Load starter content</button>
        </form>
      )}

      {!dbError &&
        SECTION_KEYS.map((key) => {
          const def = SECTIONS[key];
          const list = rows.filter((r) => r.section === key);
          const shown = def.order === "desc" ? [...list].reverse() : list;
          return (
            <div key={key} className="adm-sec">
              <h2>{def.label}</h2>

              {shown.map((r) => (
                <form action={updateItem} className="adm-card" key={r.id}>
                  <input type="hidden" name="id" value={r.id} />
                  <input type="hidden" name="section" value={key} />
                  <div className="adm-grid">
                    {def.fields.map((f) => (
                      <FieldInput key={f.name} f={f} value={r.data[f.name]} existing />
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button className="adm-b" type="submit">Save</button>
                    <button className="adm-b del" type="submit" formAction={deleteItem}>Delete</button>
                  </div>
                </form>
              ))}

              <form action={addItem} className="adm-card add">
                <input type="hidden" name="section" value={key} />
                <div className="adm-grid">
                  {def.fields.map((f) => (
                    <FieldInput key={f.name} f={f} />
                  ))}
                </div>
                <button className="adm-b alt" type="submit">+ Add</button>
              </form>
            </div>
          );
        })}
    </div>
  );
}
