import React, { useState, useEffect } from "react";
import {
  FileText,
  Target,
  Eye,
  Heart,
  Users,
  Lightbulb,
  Award,
  Scale,
  TreePine,
  Megaphone,
  GraduationCap,
  HeartPulse,
  Briefcase,
  MapPin,
  Calendar,
} from "lucide-react";
import SEO from "../components/SEO";
import LazyImage from "../components/LazyImage";
import Footer from "../components/Footer";

const AboutPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoadingTeam, setIsLoadingTeam] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/team");
      const data = await response.json();
      if (data.teamMembers) {
        // Only show active team members
        const activeMembers = data.teamMembers.filter(
          (member) => member.isActive
        );
        setTeamMembers(activeMembers);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setIsLoadingTeam(false);
    }
  };

  const objectives = [
    "To promote environmental sustainability through advocacy, community-based activities, and education.",
    "To increase access to quality education and reduce school dropout rates, especially among girls.",
    "To promote sexual and reproductive health rights (SRHR) and reduce early pregnancies and sexually transmitted infections (STIs) among youth.",
    "To enhance entrepreneurial skills and promote youth-led economic development.",
  ];

  const coreValues = [
    {
      icon: Award,
      title: "Integrity",
      description:
        "We maintain transparency and accountability in all our actions.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We believe in partnerships with communities, government, and stakeholders.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We strive for creative and sustainable solutions to challenges.",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: Heart,
      title: "Empowerment",
      description:
        "We focus on enabling individuals to make informed and impactful decisions.",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: Scale,
      title: "Equity",
      description:
        "We ensure fairness and equal opportunities for all community members.",
      color: "from-teal-500 to-teal-600",
    },
  ];

  const areasOfFocus = [
    {
      icon: TreePine,
      title: "Environmental Conservation",
      description:
        "Tree planting, forest restoration, and waste management awareness.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Megaphone,
      title: "Climate Justice Advocacy",
      description:
        "Engaging youth and local communities to participate in climate change spaces.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: GraduationCap,
      title: "Education Champion",
      description:
        "Helping youth from rural areas, especially girls, to go back to school and continue their education.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: HeartPulse,
      title: "Health and SRHR",
      description:
        "Empowering young people with knowledge on sexual and reproductive health.",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: Briefcase,
      title: "Entrepreneurship & Livelihoods",
      description:
        "Supporting women and youth through skills development and sustainable income initiatives.",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const targetGroups = [
    "Rural and peri-urban communities in Malawi",
    "Youth and women groups",
    "Schools and faith-based institutions",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="About Us - Mthunzi Trust"
        description="Learn about Mthunzi Trust, a youth-led organization empowering communities in Malawi through education, entrepreneurship, environmental sustainability, and SRHR. Discover our mission, vision, and team."
        keywords="About Mthunzi Trust, our mission, our vision, our team, Malawi NGO, youth-led organization, community empowerment"
        url="https://www.mthunzitrust.org/about"
      />
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
            About Us
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto">
            Empowering Communities, Transforming Lives
          </p>
        </div>
      </div>

      {/* Executive Summary */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-teal-600" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Executive Summary
            </h2>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Organization Name
                </h3>
                <p className="text-gray-700">Mthunzi Trust</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Tagline
                </h3>
                <p className="text-teal-600 font-semibold">
                  The Umbrella of Hope
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  Date of Establishment
                </h3>
                <p className="text-gray-700">
                  20 January 2021 (Registered: 6 June 2023)
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-teal-600" />
                  Location
                </h3>
                <p className="text-gray-700">Lilongwe and Blantyre, Malawi</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Legal Status
              </h3>
              <p className="text-gray-700">
                Registered Youth-led Non-profit Organization (Trust)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Our Vision
                </h2>
              </div>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                A thriving Malawi where empowered youth lead in sustainable
                development, economic growth, and environmental protection,
                achieving healthier, educated, and resilient communities.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-teal-600" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Our Mission
                </h2>
              </div>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                To empower youth and communities through education,
                entrepreneurship, environmental sustainability, and sexual and
                reproductive health rights (SRHR), fostering holistic and
                sustainable development in Malawi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-10">
            Organization <span className="text-teal-600">Objectives</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-l-4 border-teal-600 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{objective}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-10">
            Our Core <span className="text-teal-600">Values</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.color} rounded-full mb-4`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Areas of Focus */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-10">
            Areas of <span className="text-teal-600">Focus</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areasOfFocus.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-teal-400 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 ${area.color} rounded-lg mb-4`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {area.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-10">
            Who We <span className="text-teal-600">Serve</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {targetGroups.map((group, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 sm:p-8 shadow-lg text-center hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-teal-600" />
                </div>
                <p className="text-lg font-semibold text-gray-900">{group}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-10">
            Our <span className="text-teal-600">Team</span>
          </h2>

          {isLoadingTeam ? (
            <div className="text-center py-12">
              <div className="text-gray-500">Loading team members...</div>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500">No team members found.</div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member._id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden">
                    {member.image ? (
                      <LazyImage
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="bg-gradient-to-br from-teal-400 to-blue-500 h-full flex items-center justify-center">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                          <Users className="w-12 h-12 text-teal-600" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-teal-600 font-medium">
                      {member.position}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
