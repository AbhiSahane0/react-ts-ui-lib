//!#Imports: start
import { Pending, ProfileCard, Button } from "@react-ts-ui-lib/ui";
import { useEffect, useState } from "react";
import { useTheme } from "./context/ThemeContext";
import { useTranslation } from "../i18n/useTranslation";
//!#Imports: end

//!#Constants: start
const owner = "karel-cz";
const repo = "react-ts-ui-lib";
const GITHUB_API_BASE = `https://api.github.com/repos/${owner}/${repo}`;
const PER_PAGE = 100;
//!#Constants: end

//!#Styles: start
//!#Styles: end

//!#helpers: start
interface GitHubContributor {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string;
  contributions: number;
}

interface GitHubPullRequestUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

interface GitHubPullRequest {
  id: number;
  number: number;
  title: string;
  html_url: string;
  state: string;
  merged_at: string | null;
  user: GitHubPullRequestUser | null;
}

interface PullRequest {
  id: number;
  number: number;
  title: string;
  html_url: string;
  state: string;
  merged_at: string | null;
}

interface Contributor {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string;
  totalCommits: number;
  mergedPrCount: number;
  prs: PullRequest[];
}

/** Builds login -> PRs[] from merged PRs (for attaching to contributors from API). */
function buildPrsByLogin(mergedPrs: GitHubPullRequest[]): Map<string, PullRequest[]> {
  const map = new Map<string, PullRequest[]>();
  for (const pr of mergedPrs) {
    const user = pr.user;
    if (!user) continue;
    const entry: PullRequest = {
      id: pr.id,
      number: pr.number,
      title: pr.title,
      html_url: pr.html_url,
      state: pr.state,
      merged_at: pr.merged_at,
    };
    const list = map.get(user.login) ?? [];
    list.push(entry);
    map.set(user.login, list);
  }
  return map;
}

/** Contributors from GitHub API (ordered by commit count) + merged PRs attached per login. */
function mergeContributorsWithPrs(
  apiContributors: GitHubContributor[],
  prsByLogin: Map<string, PullRequest[]>,
): Contributor[] {
  return apiContributors.map((c) => {

    const prs = prsByLogin.get(c.login) ?? [];

    return {
      id: c.id,
      login: c.login,
      html_url: c.html_url,
      avatar_url: c.avatar_url,

      totalCommits: c.contributions,
      mergedPrCount: prs.length,

      prs,
    };
  });
}

//!#helpers: end

//!#propTypes: start
//!#propTypes: end

//!#ContributorPRDetails: start
type ContributorPRDetailsProps = {
  prs: PullRequest[];
};

function ContributorPRDetails({ prs }: ContributorPRDetailsProps) {
  const { t } = useTranslation();
  if (prs.length === 0) {
    return (
      <div style={{ padding: "8px 0", fontSize: "0.875rem" }}>
        {t("contributions.noPRs")}
      </div>
    );
  }
  return (
    <ul
      style={{
        margin: 0,
        paddingLeft: "1.25rem",
        fontSize: "0.875rem",
        paddingTop: "4px",
        listStyle: "disc",
      }}
    >
      {prs.map((pr) => (
        <li key={pr.id} style={{ marginBottom: "8px" }}>
          <a
            href={pr.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-primary)" }}
          >
            #{pr.number} — {pr.title}
          </a>
          {pr.merged_at != null && (
            <div style={{ fontSize: "0.8rem", opacity: 0.85, marginTop: "2px" }}>
              {t("contributions.mergedAt")}:{" "}
              {new Date(pr.merged_at).toLocaleString()}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
//!#ContributorPRDetails: end

function Contributions() {
  //!#visualComponent: start
  const { darkMode } = useTheme();
  const { t } = useTranslation();
  const [contributors, setContributions] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const headers = {
      Accept: "application/vnd.github+json",
      "User-Agent": "react-ts-ui-lib-Contributors",
    };

    const loadContributors = async () => {
      setLoading(true);
      try {
        // 1) Contributors API: seznam podle počtu commitů (sestupně) – ty jsi nahoře
        const contribRes = await fetch(
          `${GITHUB_API_BASE}/contributors?per_page=100`,
          { signal: controller.signal, headers },
        );
        if (!contribRes.ok) throw new Error(`GitHub API: ${contribRes.status}`);
        const apiContributors: GitHubContributor[] = await contribRes.json();

        const mergedPrs: GitHubPullRequest[] = [];
        let page = 1;
        for (; ;) {
          const prRes = await fetch(
            `${GITHUB_API_BASE}/pulls?state=closed&per_page=${PER_PAGE}&page=${page}`,
            { signal: controller.signal, headers },
          );
          if (!prRes.ok) throw new Error(`GitHub API: ${prRes.status}`);
          const data: GitHubPullRequest[] = await prRes.json();
          const merged = data.filter((pr) => pr.merged_at != null);
          mergedPrs.push(...merged);
          if (data.length < PER_PAGE) break;
          page += 1;
        }
        const prsByLogin = buildPrsByLogin(mergedPrs);
        setContributions(mergeContributorsWithPrs(apiContributors, prsByLogin));
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        console.error("Contributions fetch error:", err);
        setContributions([]);
      } finally {
        setLoading(false);
      }
    };

    loadContributors();
    return () => controller.abort();
  }, []);

  const contributorsSorted = [...contributors].sort(
    (a, b) =>
      (b.mergedPrCount * 5 + b.totalCommits) -
      (a.mergedPrCount * 5 + a.totalCommits)
  );
  //!#render components: start

  if (loading || contributors.length === 0) {
    return <Pending />;
  }

  return (
    <div style={{ margin: "16px" }}>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 16,
        alignItems: "start",
      }}
      >
        {contributorsSorted.map((c) => (
          <ProfileCard
            key={c.id}
            photo={c.avatar_url}
            photoLink={c.html_url}
            name={c.login}
            modern
            role={c.login.toLowerCase() === owner.toLowerCase() ? t("contributions.owner") : t("contributions.role")}
            metrics={[
              {
                label: t("MergedPRs"),
                value: c.mergedPrCount,
              },
              {
                label: t("TotalCommits"),
                value: c.totalCommits,
              },
            ]}
            darkMode={darkMode}
            collapsed={true}
            width="100%"
            borderRadius="md"
            content={c.login.toLowerCase() !== owner.toLowerCase() ? <ContributorPRDetails prs={c.prs} /> : undefined}
            actionList={[
              <Button
                icon="mdi-github"
                colorScheme="primary"
                significance="common"
                modern
                darkMode={darkMode}
                tooltip={t("contributions.viewProfile")}
                size="sm"
                onClick={() =>
                  window.open(c.html_url, "_blank", "noopener,noreferrer")}
              />,
            ]}
          />
        ))}
      </div>

    </div>

  );
  //!#render components: end
  //!#visualComponent: end
}

//!#export: start
export { Contributions };
export default Contributions;
//!#export: end
