import * as React from "react";
import { Container, Grid, Link, Typography } from "@mui/material";
import Layout from "../layout";
import Airdrop from "../components/Airdrop";
import BackgroundImage from "../images/background.png";
import { StaticImage } from "gatsby-plugin-image";
import { Helmet } from "react-helmet";

const styles = {
  background: {
    minHeight: "100vh",
    minWidth: "100vw",
    background: "#131222",
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
      <Helmet title="WYND DAO | RAW Airdrop" defer={false} />
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
              <Typography variant="h1" color="white">
                WYND Airdrop
              </Typography>
              <Typography color="white" variant="body1" sx={{ mt: 3 }}>
                All airdropped tokens will be vesting, meaning that they can be
                used for voting and staking from day one, but it will take a
                full year until they can all be freely transferred and sold. For
                more information check{" "}
                <Link href="https://www.rawdao.zone/vote/18" target="_blank">
                  RAW DAO's Prop 18
                </Link>
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
