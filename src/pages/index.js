import * as React from "react";
import { Container, Grid, Link, Typography } from "@mui/material";
import Layout from "../layout";
import Airdrop from "../components/Airdrop";
import BackgroundImage from "../images/background.png";
import { StaticImage } from "gatsby-plugin-image";

const styles = {
  background: {
    minHeight: "100vh",
    minWidth: "100vw",
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "65%",
  },
  logoWrapper: {
    textAlign: "center",
    paddingTop: "28px",
  },
};

const IndexPage = () => {
  return (
    <main style={styles.background}>
      <Layout>
        <Container>
          <div style={styles.logoWrapper}>
            <StaticImage src="../images/Logo.png" alt="Logo" />
          </div>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6}>
              <StaticImage src="../images/mascot.png" alt="Wynd Mascot" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h1">WYND Airdrop</Typography>
              <Typography variant="body1" sx={{ mt: 3 }}>
                All airdropped tokens will be vesting, meaning that they can be
                used for voting and staking from day one, but it will take a
                full year until they can all be freely transferred and sold. For
                more information about the Fairdrop and its distribution please
                check out{" "}
                <Link
                  href="https://docs.wynddao.com/token/airdrop.html"
                  target="_blank"
                >
                  Fairdrop Docs
                </Link>.
              </Typography>
              <Airdrop />
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </main>
  );
};

export default IndexPage;
